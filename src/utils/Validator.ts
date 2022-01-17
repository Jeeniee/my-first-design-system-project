import NumberFormatter from "./NumberFormatter";

export interface ValidateResult {
  isValid: boolean;
  message: string;
}

export default class Validator {
  public static validateNumberInputEvent(event: any): ValidateResult {
    const key = window.event ? event.keyCode : event.which;

    if (
      event.keyCode === 8 || // 백스페이스
      event.keyCode === 46 || // delete 키
      //   (event.ctrlKey && event.keyCode === 67) ||
      //   (event.metaKey && event.keyCode === 86) ||
      // 복붙은 따로 관리해야할듯
      event.keyCode === 37 || // 방향키 왼
      event.keyCode === 38 || // 방향키 위
      event.keyCode === 39 || // 방향키 오
      event.keyCode === 40 // 방향키 밑
    ) {
      return {
        isValid: true,
        message: "",
      };
    } else if (this.isNumberKeyCode(key) === false) {
      return {
        isValid: false,
        message: "not number",
      };
    } else {
      return {
        isValid: true,
        message: "",
      };
    }
  }

  private static isNumberKeyCode(key: number) {
    if (key >= 48 && key <= 57) {
      return true;
    }

    if (key >= 96 && key <= 105) {
      return true;
    }

    return false;
  }

  public static isPeriodKeyCode(event: any) {
    const key = window.event ? event.keyCode : event.which;
    if (key === 190) {
      return {
        isValid: true,
        message: "",
      };
    }

    return {
      isValid: false,
      message: "not period",
    };
  }

  public static validateBackSpaceInputEvent(event: any): ValidateResult {
    const key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
      return {
        isValid: true,
        message: "",
      };
    }

    return {
      isValid: false,
      message: "not backspace",
    };
  }

  public static validateFullName(value: string) {
    if (value === "") {
      return {
        isValid: false,
        message: "This field cannot be empty.",
      };
    }

    const splittedValue = value.split(" ");

    if (splittedValue.length < 2) {
      return {
        isValid: false,
        message: "Last name can not be empty",
      };
    }

    for (let sv of splittedValue) {
      if (sv === "") {
        return {
          isValid: false,
          message: "name can not be empty",
        };
      }
    }

    return {
      isValid: true,
      message: "",
    };
  }
}
