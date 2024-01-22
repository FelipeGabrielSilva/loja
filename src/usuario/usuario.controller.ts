import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { createUsuarioDTO } from "./dto/createUsuario.dto";
import { UsuarioEntity } from "./entities/usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioRepository: UsuarioRepository) { }

    @Post()
    async criarUsuario(@Body() dadosUsuarios: createUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.nome = dadosUsuarios.nome;
        usuarioEntity.email = dadosUsuarios.email;
        usuarioEntity.senha = dadosUsuarios.senha;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);

        return { id: usuarioEntity.id, message: `Usuário criado com sucesso` };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(usuario => new ListaUsuarioDTO(
            usuario.id,
            usuario.nome,
        ));

        return usuariosLista;
    }
}