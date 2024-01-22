import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailUnique } from "./validation/emailUnique.validator";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailUnique],
})

export class UsuarioModule { };