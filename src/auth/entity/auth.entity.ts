import { Role } from "@prisma/client";

export class AuthEntity {
    accessToken: string;
    userId: string;
    userRole: Role;
}