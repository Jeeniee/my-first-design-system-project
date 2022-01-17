export enum PollingId {
  "IS_LOGIN" = "IS_LOGIN",
  "GET_BALANCE" = "GET_BALANCE",
  "GET_COIN_BALANCE" = "GET_COIN_BALANCE",
  "GET_COIN_BALANCES" = "GET_COIN_BALANCES",
  "GET_COINBASE_CHARGE_STATUS" = "GET_COINBASE_CHARGE_STATUS",
  "GET_FLOW_WALLET" = "GET_FLOW_WALLET",
  "REFRESH_AUTH_TOKEN" = "REFRESH_AUTH_TOKEN",
  "REFRESH_NWAY_AUTH_TOKEN" = "REFRESH_NWAY_AUTH_TOKEN",
}

export class PollingManager {
  private static taskMap: any = {};
  //
  private static isBindOnMousemove = false;
  private static isRecentlyMouseMoved = true;
  private static lastMouseMoveTimestamp = 0;
  private static pointerX = -1;
  private static pointerY = -1;

  public static onMouseMove() {
    console.log("onMouseMove");
    let that = this;

    if (this.isBindOnMousemove === true) {
      return;
    }

    this.isBindOnMousemove = true;

    document.onmousemove = (event) => {
      console.log("bind onmousemove");
      const currentX = event.pageX;
      const currentY = event.pageY;
      const currentTime = Date.now();

      if (currentTime < that.lastMouseMoveTimestamp + 1000 * 1) {
        console.log("not latest");
        return;
      }

      if (that.pointerX === currentX && that.pointerY === currentY) {
        that.isRecentlyMouseMoved = false;
      } else {
        that.isRecentlyMouseMoved = true;
      }

      console.log(
        "this.isRecentlyMouseMoved",
        that.isRecentlyMouseMoved,
        "current",
        { currentX, currentY },
        "pointer",
        { pointerX: that.pointerX, pointerY: that.pointerY }
      );

      that.pointerX = currentX;
      that.pointerY = currentY;
      that.lastMouseMoveTimestamp = currentTime;
    };
  }

  public static insert(
    id: string,
    cb: Function,
    interval: number,
    options: { mouse?: boolean } = {}
  ) {
    if (this.taskMap[id] !== undefined) {
      return;
    }

    this.taskMap[id] = {
      cb,
      interval,
      setTimeoutId: null,
      options,
    };

    this.exec(id);
  }

  private static start(id: string) {
    if (this.taskMap[id] === undefined) {
      return;
    }

    let setTimeoutId = setTimeout(async () => {
      await this.exec(id);
    }, this.taskMap[id].interval);

    this.taskMap[id].setTimeoutId = setTimeoutId;
  }

  private static async exec(id: string) {
    if (this.taskMap[id] === undefined) {
      return;
    }

    if (
      this.taskMap[id].options.mouse === true &&
      this.isRecentlyMouseMoved === false
    ) {
      console.log("!!! exec fail !!!");
      this.start(id);
      return;
    }

    await this.taskMap[id].cb();

    console.log("!!! exec true !!!");
    this.isRecentlyMouseMoved = false;
    this.start(id);
  }

  public static remove(id: string) {
    if (this.taskMap[id] === undefined) {
      return;
    }

    const setTimeoutId = this.taskMap[id].setTimeoutId;
    if (setTimeoutId !== null) {
      clearTimeout(setTimeoutId);
    }

    this.taskMap[id] = undefined;
  }
}
