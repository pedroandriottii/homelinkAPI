import { IsNumber, IsString, IsEnum } from "@nestjs/class-validator";
import { Color } from "@prisma/client";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsEnum(Color)
    color: Color;

    @IsNumber()
    categoryId: number;

    @IsString()
    brand: string;
}
