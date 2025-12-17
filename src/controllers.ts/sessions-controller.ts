import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { authConfig } from "@/configs/auth";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z
        .string()
        .email({ message: "Digite um email válido" })
        .trim()
        .toLowerCase(),

      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválidos", 401);
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
      }
    );

    const { password: _, ...userWithoutPassword } = user;

    response.json({ user: userWithoutPassword, token });
  }
}

export { SessionsController };
