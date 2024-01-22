import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { createUsuarioDTO } from "./dto/createUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { UsuarioEntity } from "./entities/usuario.entity";
import { v4 as uuid } from "uuid";
import { atualizarUsuarioDTO } from "./dto/atualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioRepository: UsuarioRepository) { }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: createUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);

        return {
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            mensagem: `Usuário ${usuarioEntity.nome} criado com sucesso`,
        };
    }

    @Get()
    async listUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );

        return usuariosLista;
    }

    @Put(`/:id`)
    async atualizarUsuario(@Param('id') id: string, @Body() dadosAtualizar: atualizarUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualizar(id, dadosAtualizar);

        return {
            usuario: usuarioAtualizado,
            message: `Dados do usuário atualizados com sucesso!`,
        }
    };

    @Delete('/:id')
    async deleteUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id);

        return {
            usuario: usuarioRemovido,
            message: `Usuário ${usuarioRemovido.nome} removido com sucesso!`,
        }
    }
}