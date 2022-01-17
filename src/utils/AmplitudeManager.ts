import amplitude from "amplitude-js";
import configs from "../configs";
import {
  isMobile,
  osName,
  isDesktop,
  browserVersion,
  deviceType,
} from "react-device-detect";

export class AmplitudeManager {
  private static _instance: AmplitudeManager;
  private defaultInstance: amplitude.AmplitudeClient | null;
  private versionName: string;

  private constructor() {
    if (configs.AMPLITUDE_KEY === undefined || configs.AMPLITUDE_KEY === "") {
      this.defaultInstance = null;
      this.versionName = "";
      return;
    }

    this.versionName = "Web";

    amplitude.getInstance().init(
      configs.AMPLITUDE_KEY,
      undefined,
      {
        logLevel: "DISABLE",
        includeReferrer: true,
        includeUtm: true,
        includeGclid: true,
      },
      () => {}
    );
    amplitude.getInstance().setVersionName(this.versionName);
    this.defaultInstance = amplitude.getInstance();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  // logs ==============================================================

  // action

  public logEventWalletPage() {
    this.logEvent("visitedWalletPage", null);
  }

  public logClick(clicked: string, page: string, userId: number | string = "") {
    this.logEvent(
      "Click",
      {
        clicked,
        page,
      },
      userId
    );
  }

  public onLoadpage(url: string) {
    this.logEvent("OnLoadpage", {
      url,
    });
  }

  // private ==============================================================

  private mergeWithDeviceInfo(data: any) {
    const device = {
      OS: osName,
      BrowserVersion: browserVersion,
      DeviceType: deviceType,
      IsDesktop: isDesktop,
      isMobile: isMobile,
    };

    return { ...data, ...device };
  }

  private logEvent(
    event: string,
    eventData: any,
    userId: number | string = ""
  ) {
    if (this.defaultInstance === null) {
      return;
    }

    try {
      if (userId !== "") {
        this.defaultInstance.setUserId(this.getUserId(userId));
      }

      this.defaultInstance.logEvent(
        event,
        this.mergeWithDeviceInfo({ eventData })
      );
    } catch (error) {
      console.error(error);
    }
  }

  private logRevenue(
    productId: string,
    price: number,
    quantity: number,
    userId: number | string = ""
  ) {
    if (this.defaultInstance === null) {
      return;
    }

    try {
      if (userId !== "") {
        this.defaultInstance.setUserId(this.getUserId(userId));
      }

      const revenue = new amplitude.Revenue()
        .setProductId(productId)
        .setPrice(price)
        .setQuantity(quantity);
      this.defaultInstance.logRevenueV2(revenue);
    } catch (error) {
      console.error(error);
    }
  }

  private getUserId(userId: number | string) {
    return `userId:${String(userId)}`;
  }
}
