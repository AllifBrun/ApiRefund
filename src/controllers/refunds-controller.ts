import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "../../database/prisma";
import { z } from "zod";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "accomodation",
  "transport",
]);

class RefundsController {
  constructor() {}

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "O nome deve conter pelo menos 2 caracteres" }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "O valor deve ser positivo" }),
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(request.body);

    if (!request.user?.id) {
      throw new AppError("Unauthorized", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        userId: request.user.id,
        filename,
      },
    });

    return response.status(201).json({ refund });
  }

  async index(request: Request, response: Response) {
    response.json({ message: "Rota index do refund ok!" });
  }
}

export { RefundsController };
