import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnique implements ValidatorConstraintInterface {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioExistente = await this.usuarioRepository.cadastroExistente(value);

        return !usuarioExistente;
    }
}

export const EmailUnico = (opcoesValidacoes: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacoes,
            constraints: [],
            validator: EmailUnique,
        });
    }
}