import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";
import { EmailUnico } from "../validation/emailUnique.validator";

export class createUsuarioDTO {
    idUsuario: string;

    @IsNotEmpty({ message: `O nome não pode ser vazio` })
    nome: string;

    @IsEmail(undefined, { message: `O e-mail informado é inválido` })
    @IsNotEmpty({ message: `O e-mail não pode ser vazio` })
    @EmailUnico({ message: `E-mail já em uso` })
    email: string;

    @MinLength(6, { message: `A senha deve ter no mínimo 6 caracteres` })
    @IsNotEmpty()
    senha: string;
}