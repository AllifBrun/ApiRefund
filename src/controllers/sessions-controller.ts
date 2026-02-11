import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError";

class SessionsController {
  constructor() {}

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().trim().email({ message: "E-mail inválido!" }),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("E-mail ou senha inválida!");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválida!");
    }

    return response.json({ message: "Usuário autenticado!" });
  }
}

export { SessionsController };
