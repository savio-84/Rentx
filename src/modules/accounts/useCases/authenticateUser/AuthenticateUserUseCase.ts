import 'reflect-metadata';
import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from 'jsonwebtoken';
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };

    token: string;
}


@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepositoru: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Usuario existe
        const user = await this.usersRepositoru.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect!');
        }

        // Senha esta correta

        const passwordMatch = await compare(password, user.password);

        if (!password) {
            throw new AppError('Email or password incorrect!');
        }

        // Gerar jsonwebtoken

        const token = sign({}, '94f94812eb4f2af5fd37510d1bbbf1e0', {
            subject: user.id,
            expiresIn: '1d'
        });

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }
    }
}

export { AuthenticateUserUseCase };