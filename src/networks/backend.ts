import axios, { AxiosResponse } from "axios";
import configs from "../configs";
import { convertQueryStr, getAuthorization } from "../utils";
import { getJWTPayload } from "../utils/auth";
import { CookieName } from "../utils/cookie";
import CookieManager from "../utils/CookieManager";

export interface BackendAPIResponse {
  success: boolean;
  body?: any;
  errors?: any[];
  error?: any;
  fancyError?: any;
}

export enum BackendAPIResponseStatusCode {
  UNCAUGHT = -1,
  //
  UNAUTHORIZED = 0,
  VALIDATION_UNCAUGHT_ERROR = 103,
  VALIDATION_ERROR = 104,
  NOT_FOUND = 404,
  //
  NOT_EXPECTED_HTTP_STATUS_CODE = 20000,
  CIRCLE_API_ERROR = 20001,
  CIRCLE_CARD_CREATED_FAILED = 20002,
  CIRCLE_PAYMENT_CREATED_FAILED = 20003,
  MAXIMUM_CARD = 20004,
  PURCHASE_LIMIT_PER_DAY = 20005,
  PURCHASE_LIMIT_PER_WEEK = 20006,
  PURCHASE_LIMIT_PER_MONTH = 20007,
  PURCHASE_LIMIT_LIFETIME = 20008,
  MINIMUM_ADD_FUDNS = 20009,
  MAXIMUM_ADD_FUNDS = 20010,
  USER_HAVE_NOT_ENOUGHT_BALANCE = 20011,
  FORBIDDEN_API = 20012, // Fraud user, Fraud user가 호출할 수 없는 API 호출시 authorization error로 응답 됩니다.
  BLOCKED_USER = 20013, // block된 유저
  EXPIRED_ACCESS_TOKEN = 20014, // jwt 만료됨
  INVALID_JWT = 20015, // jwt verify 실패 또는 예전 jwt 사용
  MINIMUM_WITHDRAWAL = 20024,
  MAXIMUM_WITHDRAWAL = 20025,
  EXPIRED_ACTION = 20026,
  MAXIMUM_PAYOUT_REQUEST = 20027,
}

export default class BackendAPI {
  private static instance = axios.create({
    baseURL: configs.BACKEND_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function (status) {
      return true;
    },
  });
  private static errorCallBackMap: { [key: string]: Function } = {};
  public static setErrorCallBack(key: string, cb: Function) {
    this.errorCallBackMap[key] = cb;
  }

  private static handleRequest(url: string, needJWT: boolean = false) {
    let jwt = "";
    if (needJWT) {
      jwt = CookieManager.getCookie(CookieName.NWAYPLAY_AUTH_TOKEN) || "";
      const jwtPayload = getJWTPayload(jwt);
      if (jwtPayload === null) {
        this.errorCallBackMap["logout"]();
        throw {
          success: false,
          error: {
            code: BackendAPIResponseStatusCode.UNAUTHORIZED,
            message: "",
          },
        };
      }

      this.instance.defaults.headers["authorization"] = getAuthorization(jwt);
    }

    return {
      needJWT,
      jwt,
    };
  }

  private static handleResponse<T>(
    response: AxiosResponse<any>,
    parser?: Function
  ) {
    const responseData = response.data as BackendAPIResponse;
    if ((response.status >= 200 && response.status < 400) === false) {
      throw responseData;
    }
    if (this.isErrorResponse(responseData)) {
      throw responseData;
    }

    if (parser) {
      return parser(responseData);
    }

    return {
      success: true,
      body: responseData.body as T,
    };
  }

  private static async get<T>(
    url: string,
    {
      needJWT,
      parser,
      errorParser,
    }: {
      needJWT?: boolean;
      parser?: Function;
      errorParser?: Function;
    } = {}
  ) {
    let jwt = "";
    try {
      const info = this.handleRequest(url, needJWT);
      if (needJWT) {
        jwt = info.jwt;
      }
      const response = await this.instance.get(url);

      return this.handleResponse<T>(response, parser);
    } catch (error: any) {
      const statusCode = this.getStatusCodeFromErrorResponse(error);
      const message = this.getMessageFromErrorResponse(error);

      if (this.isRetryStatusCode(statusCode, jwt)) {
        const response = (await this.get<T>(url, {
          needJWT,
          parser,
        })) as
          | {
              success: boolean;
              body: T;
              statusCode?: string | BackendAPIResponseStatusCode;
              message?: string;
            }
          | {
              success: boolean;
              statusCode: string | BackendAPIResponseStatusCode;
              message: string;
              body?: T;
            };
        return response;
      }

      if (this.isLogoutStatusCode(statusCode)) {
        this.errorCallBackMap["logout"]();
      }

      if (errorParser) {
        return errorParser(error, statusCode, message);
      }

      return {
        success: false,
        statusCode,
        message,
      };
    }
  }

  private static async post<T>(
    url: string,
    data: any,
    {
      needJWT,
      parser,
      errorParser,
    }: {
      needJWT?: boolean;
      parser?: Function;
      errorParser?: Function;
    } = {}
  ) {
    let jwt = "";
    try {
      const info = this.handleRequest(url, needJWT);
      if (needJWT) {
        jwt = info.jwt;
      }
      const response = await this.instance.post(url, data);

      return this.handleResponse<T>(response, parser);
    } catch (error: any) {
      const statusCode = this.getStatusCodeFromErrorResponse(error);
      const message = this.getMessageFromErrorResponse(error);

      if (this.isRetryStatusCode(statusCode, jwt)) {
        const response = (await this.post<T>(url, data, {
          needJWT,
          parser,
        })) as
          | {
              success: boolean;
              body: T;
              statusCode?: string | BackendAPIResponseStatusCode;
              message?: string;
            }
          | {
              success: boolean;
              statusCode: string | BackendAPIResponseStatusCode;
              message: string;
              body?: T;
            };
        return response;
      }

      if (this.isLogoutStatusCode(statusCode)) {
        this.errorCallBackMap["logout"]();
      }

      if (errorParser) {
        return errorParser(error, statusCode, message);
      }

      return {
        success: false,
        statusCode,
        message,
      };
    }
  }

  private static isErrorResponse(response: BackendAPIResponse) {
    return (
      response.success === false ||
      response.errors !== undefined ||
      response.error !== undefined
    );
  }

  private static isLogoutStatusCode(
    statusCode: BackendAPIResponseStatusCode | string
  ) {
    return (
      statusCode === BackendAPIResponseStatusCode.EXPIRED_ACCESS_TOKEN ||
      statusCode === BackendAPIResponseStatusCode.INVALID_JWT ||
      statusCode === BackendAPIResponseStatusCode.UNAUTHORIZED ||
      statusCode === BackendAPIResponseStatusCode.FORBIDDEN_API
    );
  }

  private static isRetryStatusCode(
    statusCode: BackendAPIResponseStatusCode | string,
    jwt: string
  ) {
    // 응답 상태가 INVALID_JWT 이고 jwt가 요청할때와 요청한 후가 바뀌었을때 (리플래쉬되었을때)
    return (
      statusCode === BackendAPIResponseStatusCode.INVALID_JWT &&
      jwt !== CookieManager.getCookie(CookieName.NWAYPLAY_AUTH_TOKEN)
    );
  }

  private static getStatusCodeFromErrorResponse(
    errorResponse: BackendAPIResponse
  ) {
    let statusCode: BackendAPIResponseStatusCode | string =
      BackendAPIResponseStatusCode.UNCAUGHT;
    if (errorResponse.errors !== undefined && errorResponse.errors.length > 0) {
      const parsedError = errorResponse.errors[0];
      if (parsedError.authorization) {
        statusCode = parsedError.authorization.code;
      } else if (parsedError.serviceStatus) {
        // get service status
        statusCode = parsedError.serviceStatus.code;
      } else {
        statusCode = parsedError.code || -1;
      }
    } else if (errorResponse.error !== undefined) {
      statusCode = errorResponse.error.code || -1;
    } else if (errorResponse.fancyError !== undefined) {
      statusCode = errorResponse.fancyError || -1;
    }

    return statusCode;
  }

  private static getMessageFromErrorResponse(
    errorResponse: BackendAPIResponse
  ) {
    let message = "";
    if (errorResponse.errors !== undefined && errorResponse.errors.length > 0) {
      const parsedError = errorResponse.errors[0];
      const keys = Object.keys(parsedError);
      if (parsedError[keys[0]]) {
        message = parsedError[keys[0]].error || "";
      }
    } else if (errorResponse.error !== undefined) {
      message = errorResponse.error.message || "";

      // circle credit card
      if (errorResponse.error.error && errorResponse.error.error.message) {
        message = errorResponse.error.error.message || "";
      } else if (
        errorResponse.error.error &&
        errorResponse.error.error.errorCode
      ) {
        // circle 경우 나올 수 있음
        message = errorResponse.error.error.errorCode || "";
      } else if (typeof errorResponse.error === "string") {
        message = errorResponse.error || ""; // buy box
      } else if (typeof errorResponse.error.error === "string") {
        message = errorResponse.error.error || ""; // buy box
      }
    } else if (errorResponse.fancyError !== undefined) {
      message = errorResponse.fancyError || "";
    } else if (
      errorResponse.body &&
      typeof errorResponse.body.error === "string"
    ) {
      message = errorResponse.body.error || ""; // buy box
    }

    return message;
  }

  public static async getExample(id: string, query: { page: any }) {
    return await this.get<{ example: number }>(
      `/api/${id}/example${convertQueryStr(query)}`,
      {
        needJWT: true,
        parser: (responseData: any) => {
          return {
            success: true,
            body: {
              data: responseData.example,
            },
          };
        },
      }
    );
  }
}
