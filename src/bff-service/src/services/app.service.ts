import { HttpException, HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosResponse, AxiosRequestConfig, Method } from "axios";

import { CacheService } from "./cache.service";

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private cacheService: CacheService,
    private configService: ConfigService
  ) {}

  async response(
    serviceType: string,
    url: string,
    method: string,
    data: any,
    headers: any
  ) {
    const serviceURL = this.configService.get<string>(serviceType);
    const requestURL = serviceURL + serviceType + url;
    delete headers.host;

    let axiosConfig: AxiosRequestConfig = {
      headers,
      baseURL: requestURL,
      method: method as Method,
    };
    if (method === "POST") {
      axiosConfig = { ...axiosConfig, data: data || {} };
    }

    if (serviceType === "products" && method === "GET") {
      if (this.cacheService.validCacheExist()) {
        return {
          status: 200,
          headers: {
            "access-control-allow-origin": "https://d1mv4b218fitsr.cloudfront.net",
            "x-cache":"HIT"
          },
          data: this.cacheService.get(),
        }
      }
    }

    const response = await this.httpService
      .request<AxiosResponse>(axiosConfig)
      .toPromise();
  
    if (serviceType === "products" && method === "GET") {
      this.cacheService.set(response.data);
    }

    return response;
  }

  cannotProcessRequest(): never {
    throw new HttpException("Cannot process request", 500);
  }
}
