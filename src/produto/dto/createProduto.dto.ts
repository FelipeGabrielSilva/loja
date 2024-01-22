import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, Min, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./caracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./imagemProduto.dto";
import { Type } from "class-transformer";

export class ProdutoDTO {
    @IsString()
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    valor: number;

    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    quantidade: number;

    @IsString()
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    caracteristica: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    imagem: ImagemProdutoDTO[];

    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    categoria: string;
}