import BigNumber from "bignumber.js";

export default class NumberFormatter {
  private static SMALL_NUMBER: number = 0.00000001;

  public static formatUSD(
    value: number | string,
    options: {
      prefix?: string;
      showSign?: boolean;
      unit?: string;
      unitSpace?: boolean;
      max?: number;
    } = {}
  ) {
    const defaultOptions = {
      hasComma: true,
      decimal: 2,
      max: 100000000000,
      unitSpace: true,
    };
    return this.format(value, { ...defaultOptions, ...options });
  }

  public static formatCreditCardNumber(value: string) {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,20}/g);
    const match = (matches && matches[0]) || "";
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  }

  public static format(
    value: number | string,
    options: {
      prefix?: string;
      decimal?: number | string;
      isFixed?: boolean;
      type?: string;
      hasComma?: boolean;
      showSign?: boolean;
      unit?: string;
      unitSpace?: boolean;
      lang?: string;
      max?: number;
    } = {}
  ) {
    if (Number.isNaN(+value) === true) {
      throw Error(`${value}는 사용할 수 없는 값입니다`);
    }

    if (options.lang === "ko") {
      return this.formatToKoreanStyleNumber(+value);
    }

    ////////////////////
    // prefix
    const prefix: string = options.prefix || "";

    // 소수점 자리
    const decimal: number | string = options.decimal || 0;

    // 소수점 고정 true인 경우
    const isFixed: boolean = options.isFixed || false;

    // 내림, 반올림, 올림
    const type: string = options.type || "round"; // floor, round, ceil
    ////////////////////

    // 쉼표 여부
    const hasComma: boolean = options.hasComma || false;

    // 부호 표시 여부
    const showSign: boolean = options.showSign || false;

    // 단위
    const unit: string = options.unit || "";
    const unitSpace: boolean = options.unitSpace || false;

    // 소수점 아래 em tag 여부
    // const hasEmTag: boolean = options.hasEmTag;
    /////////////////////

    let tempValue: number | string =
      options.max !== undefined && value > options.max ? options.max : value;

    if (decimal === "auto") {
      tempValue = this.autoDecimal(tempValue + "");
    } else if (isFixed === true) {
      tempValue = this.fixedByDecimal(+tempValue, {
        type,
        decimal: +decimal,
      });
    } else {
      tempValue = this.dimishedByDecimal(+tempValue, {
        type,
        decimal: +decimal,
      });
    }

    if (hasComma === true) {
      tempValue = this.setComma(tempValue);
    }

    if (showSign === true) {
      tempValue = this.setSign(tempValue);
    }

    if (unit !== "") {
      tempValue = this.setUnit(tempValue, unit, unitSpace);
    }

    if (prefix !== "") {
      tempValue = prefix + tempValue;
    }

    return tempValue;
  }

  private static formatToKoreanStyleNumber(value: number): string {
    const count = 0;
    const units = ["", "만", "억", "조"];
    const results: number[] = [];
    if (value === 0) {
      return "0";
    }

    while (value >= 1) {
      // 4자리가 넘어서는 경우에 하나씩 자른다.
      results.push(value % 10000);
      value = Math.floor(value / 10000);
    }

    // 상위 두개만 쓴다
    const unit1 = results.length - 1;
    let result = results[unit1] + units[unit1];
    // 첫째 자리가 2자리이고 두번째가 존재하면 한구간을 더 쓴다
    // ex) 11억 3천만 (백단위는 자른다)
    const unit2 = results.length - 2;
    if (unit2 >= 0) {
      if (results[unit2] >= 1000) {
        result += " " + Math.floor(results[unit2] / 1000) + "천" + units[unit2];
      } else if (results[unit2] >= 100) {
        result += " " + Math.floor(results[unit2] / 100) + "백" + units[unit2];
      } else if (results[unit2] >= 10) {
        result += " " + Math.floor(results[unit2] / 10) + "십" + units[unit2];
      }
    }

    return result;
  }

  private static setComma(value: number | string): string {
    const reg = /(^[+-]?\d+)(\d{3})/;
    value = value + "";
    while (reg.test(value)) {
      value = value.replace(reg, "$1" + "," + "$2");
    }
    return value;
  }

  private static setUnit(
    value: number | string,
    unit: string,
    space: boolean
  ): string {
    if (space === true) {
      return `${value} ${unit}`;
    }

    return `${value}${unit}`;
  }

  private static fixedByDecimal(
    value: number,
    options: {
      decimal: number;
      type: string; // round, ceil, floor
    }
  ): string {
    let valueDecimalLength = 0;
    const underOfDecimal = (value + "").split(".")[1];
    if (underOfDecimal !== undefined) {
      valueDecimalLength = underOfDecimal.length;
    }

    if (options.decimal < valueDecimalLength) {
      return this.dimishedByDecimal(value, options);
    }

    return value.toFixed(options.decimal);
  }

  private static dimishedByDecimal(
    value: number,
    options: {
      decimal: number;
      type: string; // round, ceil, floor
    }
  ): string {
    if (this.isSmallNumber(value) === true) {
      return new BigNumber(value).toFixed();
    }

    const decimal = options.decimal;
    // 반올림
    let result = Math.round(value * 10 ** decimal) / 10 ** decimal;

    // 올림
    if (options.type === "ceil") {
      result = Math.ceil(value * 10 ** decimal) / 10 ** decimal;
    }

    // 내림
    if (options.type === "floor") {
      result = Math.floor(value * 10 ** decimal) / 10 ** decimal;
    }

    // 반올림
    return String(result);
  }

  private static isSmallNumber(value: number) {
    return Math.abs(value) < this.SMALL_NUMBER;
  }

  private static autoDecimal(value: number | string) {
    // TODO: 수정해야함..
    if ((value + "").indexOf(".") > 0 && this.isSmallNumber(+value) === true) {
      let splitted = (value + "").split(".");
      let before = +splitted[0];
      let after = splitted[1];
      return before + "." + after;
    }

    if (this.isSmallNumber(+value) === true) {
      return new BigNumber(+value).toFixed();
    }

    if ((value + "").indexOf(".") === -1) {
      return +value + "";
    }

    return value + "";
  }

  private static setSign(value: string | number): string {
    if (typeof value === "string") {
      const numValue = this.convertStrToNum(value);
      if (numValue > 0) {
        return "+" + value;
      }
    }

    if (typeof value === "number") {
      if (value > 0) {
        return "+" + value;
      }
    }

    return value + "";
  }

  public static convertStrToNum(value: string): number {
    return parseFloat(value.replace(/,/gi, ""));
  }

  public static extractComma(value: string): string {
    return value.replace(/,/gi, "");
  }
}
