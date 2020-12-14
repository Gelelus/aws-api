import {
  All,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";

import { AppService } from "./services/app.service";

const paths = ["api", "products"];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All(":path")
  async anyRequest(
    @Param("path") path: string,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    if (paths.includes(path)) {
      try {
        const response = await this.appService.response(
          path,
          req.url,
          req.method,
          body,
          req.headers
        );

        return res
          .set({ ...response.headers })
          .status(response.status)
          .json(response.data);
      } catch ({ response: { status, headers, data } }) {
        if (status !== 500) {
          return res
            .set({ ...headers })
            .status(status)
            .json(data);
        }
        throw new InternalServerErrorException();
      }
    }

    this.appService.cannotProcessRequest();
  }

  @All()
  all() {
    this.appService.cannotProcessRequest();
  }
}
