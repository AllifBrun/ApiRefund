import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { z } from "zod";
import { UserRole } from "../../generated/prisma/enums";

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

    response.status(201).json("tudo ok");
  }
}
export { UserController };
