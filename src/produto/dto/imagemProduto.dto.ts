import { IsString, IsUrl } from "class-validator";

export class ImagemProdutoDTO {
    @IsUrl(undefined, { message: 'URL para imagem inválida' })
    url: string;

    @IsString()
    descricao: string;
}