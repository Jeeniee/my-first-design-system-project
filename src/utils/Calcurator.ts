import BigNumber from "bignumber.js";

export default class Calculator {
  public static plus(a: string | number, b: string | number) {
    const aNum = new BigNumber(a);
    const bNum = new BigNumber(b);

    return aNum.plus(bNum);
  }
  public static dividedBy(a: string | number, b: string | number) {
    const aNum = new BigNumber(a);
    const bNum = new BigNumber(b);

    return aNum.dividedBy(bNum);
  }

  public static minus(a: string | number, b: string | number) {
    const aNum = new BigNumber(a);
    const bNum = new BigNumber(b);

    return aNum.minus(bNum);
  }

  public static multipliedBy(a: string | number, b: string | number) {
    const aNum = new BigNumber(a);
    const bNum = new BigNumber(b);

    return aNum.multipliedBy(bNum);
  }
}
