import axios from "axios";
import configs from "configs";
import { getAuthorization } from "utils";
import { getJWTPayload } from "utils/auth";
import { CookieName } from "utils/cookie";
import CookieManager from "utils/CookieManager";

// {error:{num: int, text: string}, accessToken: string}
export interface NwayAPIResponse {
  accessToken?: string;
  error: {
    num: number;
    text: string;
  };
}

export enum NwayAPIResponseStatusCode {
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
}

export default class NwayAPI {
  private static instance = axios.create({
    baseURL: configs.NWAY_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    } as {
      "Content-Type": string;
      authorization?: string;
    },
    validateStatus: (status: any) => {
      return true; // (status >= 200 && status < 400) || status === 422;
    },
  });
  private static errorCallBackMap: { [key: string]: Function } = {};
  public static setErrorCallBack(key: string, cb: Function) {
    this.errorCallBackMap[key] = cb;
  }

  private static async get<T>(url: string, needJWT: boolean = false) {
    try {
      if (needJWT) {
        const jwt =
          CookieManager.getCookie(CookieName.NWAYPLAY_NWAY_AUTH_TOKEN) || "";
        const jwtPayload = getJWTPayload(jwt);
        if (jwtPayload === null) {
          this.errorCallBackMap["logout"]();
          throw {
            success: false,
            statusCode: NwayAPIResponseStatusCode.UNAUTHORIZED,
          };
        }

        this.instance.defaults.headers["authorization"] = getAuthorization(jwt);
      }

      const response = await axios.get(url);
      const responseData = response.data as NwayAPIResponse;
      if ((response.status >= 200 && response.status < 400) === false) {
        throw responseData;
      }
      if (this.isErrorResponse(responseData)) {
        throw responseData;
      }

      return {
        success: true,
        body: responseData,
      };
    } catch (error: any) {
      return {
        success: false,
        statusCode: this.getStatusCodeFromErrorResponse(error),
        message: this.getMessageFromErrorResponse(error),
      };
    }
  }

  private static async post<T>(url: string, data: any, needJWT = false) {
    try {
      if (needJWT) {
        const jwt =
          CookieManager.getCookie(CookieName.NWAYPLAY_NWAY_AUTH_TOKEN) || "";
        const jwtPayload = getJWTPayload(jwt);
        if (jwtPayload === null) {
          this.errorCallBackMap["logout"]();
          throw {
            success: false,
            statusCode: NwayAPIResponseStatusCode.UNAUTHORIZED,
          };
        }

        this.instance.defaults.headers["authorization"] = getAuthorization(jwt);
      }

      const response = await axios.post(url, data);
      const responseData = response.data as NwayAPIResponse;
      if ((response.status >= 200 && response.status < 400) === false) {
        throw responseData;
      }
      if (this.isErrorResponse(responseData)) {
        throw responseData;
      }

      return {
        success: true,
        body: responseData,
      };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        statusCode: this.getStatusCodeFromErrorResponse(error),
        message: this.getMessageFromErrorResponse(error),
      };
    }
  }

  private static isErrorResponse(response: NwayAPIResponse) {
    return response.error.num !== 0;
  }

  private static getStatusCodeFromErrorResponse(
    errorResponse: NwayAPIResponse
  ) {
    let statusCode: NwayAPIResponseStatusCode | string =
      NwayAPIResponseStatusCode.UNCAUGHT;
    if (errorResponse.error !== undefined) {
      statusCode = errorResponse.error.num || -1;
    }

    return statusCode;
  }

  private static getMessageFromErrorResponse(errorResponse: NwayAPIResponse) {
    let message = "";
    if (errorResponse.error !== undefined) {
      message = errorResponse.error.text || "";
    }

    return message;
  }

  // http://api.dev.nwayplay.io:7080/auth/v1/session/refresh
  public static async refreshSession(body: {
    pid: string;
    accessToken: string;
  }) {
    return await this.post<{ accessToken: string }>(
      `/auth/v1/session/refresh`,
      body
    );
  }
}
