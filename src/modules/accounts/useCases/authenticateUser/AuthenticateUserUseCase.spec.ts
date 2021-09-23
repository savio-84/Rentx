import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { AppError } from "../../../../errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;

describe('Authenticate User', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it('Should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };

        await createUsersUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

        expect(result).toHaveProperty('token')
    })

    it('Should not be able to authenticate an nonexistent user', async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'falseemail@test.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '000123',
                email: 'user@test.com',
                password: '1234',
                name: 'User Test',
            };

            await createUsersUseCase.execute(user);

            const result = await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            })

        }).rejects.toBeInstanceOf(AppError);
    })
});