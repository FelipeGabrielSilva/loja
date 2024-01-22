import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./entities/usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }

    async cadastroExistente(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    private buscaPorID(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id,
        );

        if (!possivelUsuario) {
            throw new Error('Usuário não existe');
        };

        return possivelUsuario;
    }

    async atualizar(id: string, dadosNovos: Partial<UsuarioEntity>) {
        const usuario = this.buscaPorID(id);

        Object.entries(dadosNovos).forEach(([chave, valor]) => {
            if (chave === id) {
                return;
            }

            usuario[chave] = valor;
        })

        return usuario;
    }

    async remove(id: string) {
        const usuario = this.buscaPorID(id);
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id,
        );

        return usuario;
    }
} 