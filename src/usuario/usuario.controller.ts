import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { createUsuarioDTO } from "./dto/createUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioRepository: UsuarioRepository) { }

    @Post()
    async criarUsuario(@Body() dadosUsuarios: createUsuarioDTO) {
        this.usuarioRepository.salvar(dadosUsuarios);
        return dadosUsuarios;
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}