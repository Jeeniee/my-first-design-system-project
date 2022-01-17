import { formatDistanceToNow, format, add } from "date-fns";

// https://date-fns.org/docs/Getting-Started
// https://brunch.co.kr/@k2u4yt/6
export default class DateFormatter {
  public static format(
    value: Date | string | number,
    options: {
      fromNow?: boolean;
      pattern?: string;
    } = {}
  ) {
    let date = value;
    if (typeof value === "string" || typeof value === "number") {
      date = new Date(value);
    }

    if (options.fromNow) {
      return formatDistanceToNow(date as Date);
    }

    // 20/Aug/2021 14:03:40 PDT
    // "dd/MM/yyyy HH:mm:ss"
    if (options.pattern) {
      return format(date as Date, options.pattern);
    }

    return null;
  }
  public static addDay(value: Date | string | number, days: Duration) {
    let date = value;
    if (typeof value === "string" || typeof value === "number") {
      date = new Date(value);
    }
    return add(date as Date, days);
  }
}
