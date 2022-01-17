import axios from "axios";

export default class ExternalAPI {
  public static async getIpAddress(): Promise<{ ip: string }> {
    const response = await axios.get("https://api64.ipify.org/?format=json");
    return response.data;
  }
}
