import { Injectable } from '@nestjs/common';



@Injectable()
export class CacheService {
  private readonly cache = {
    data: [],
    expDate: 0,
  };

  private readonly expTime = 120000; // 2 minutes

  set(data: any) {
    this.cache.data = data;
    this.cache.expDate = Date.now() + this.expTime;
  }

  get() {
    return this.cache.data;
  }

  validCacheExist() {
    return this.cache.data.length !== 0 && this.cache.expDate > Date.now();
  }
}
