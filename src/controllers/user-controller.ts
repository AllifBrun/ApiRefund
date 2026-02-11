import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { z } from "zod";
import { UserRole } from "../../generated/prisma/enums";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";

class UserController {
  constructor() {}

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().trim().min(3).email(),
      password: z.string().min(6),

      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    const { name, email, password, role } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse e-mail");
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    response.status(201).json("Usuário cadastrado com sucesso!");
  }
}
export { UserController };
