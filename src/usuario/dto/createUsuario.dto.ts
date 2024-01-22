import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class createUsuarioDTO {
    @IsNotEmpty({ message: `O nome não pode ser vazio` })
    nome: string;

    @IsEmail(undefined, { message: `O e-mail informado é inválido` })
    @IsNotEmpty({ message: `O e-mail não pode ser vazio` })
    email: string;

    @MinLength(6, { message: `A senha deve ter no mínimo 6 caracteres` })
    @IsNotEmpty()
    senha: string;
}