import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database/prisma";
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError";
import { sign } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

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

    const { secret, expiresIn } = authConfig.jwt;

    const token = await sign(
      {
        role: user.role,
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    const { password: _, ...userWithoutPassword } = user;

    return response.json({ user: userWithoutPassword, token });
  }
}

export { SessionsController };
