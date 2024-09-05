import { IsNumber } from "@nestjs/class-validator";

export class CreateOrderDto {
    @IsNumber()
    totalValue: number;

}
