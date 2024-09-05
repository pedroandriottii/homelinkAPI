import { IsNumber, IsOptional, IsString, IsUrl } from "@nestjs/class-validator";

export class CreateRoomDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsUrl()
    @IsOptional()
    photoUrl: string;

    @IsString()
    orderId: string;
}
