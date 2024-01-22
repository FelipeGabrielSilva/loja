import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { EmailUnico } from "../validation/emailUnique.validator";

export class atualizarUsuarioDTO {
    @IsNotEmpty({ message: `O nome não pode ser vazio` })
    @IsOptional()
    nome: string;

    @IsEmail(undefined, { message: `O e-mail informado é inválido` })
    @IsNotEmpty({ message: `O e-mail não pode ser vazio` })
    @IsOptional()
    email: string;

    @MinLength(6, { message: `A senha deve ter no mínimo 6 caracteres` })
    @IsNotEmpty()
    @IsOptional()
    senha: string;
}