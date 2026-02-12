import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

class RefundsController {
  constructor() {}

  async create(request: Request, response: Response) {
    return response.status(201).json({ message: "controller refunds ok!" });
  }
}

export { RefundsController };
