import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { ProdutoDTO } from "./dto/createProduto.dto";

@Controller('/produtos')
export class ProdutoController {
    constructor(private readonly produtoRepository: ProdutoRepository) { }

    @Post()
    async criaProduto(@Body() dadosProdutos: ProdutoDTO) {
        const produtoCadastrado = this.produtoRepository.salvar(dadosProdutos);
        return produtoCadastrado;
    }

    @Get()
    async listarProdutos() {
        return this.produtoRepository.listar();
    }
}