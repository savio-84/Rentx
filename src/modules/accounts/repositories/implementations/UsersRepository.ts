import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        console.log('chegou aqui');

        const user = this.repository.create({
            name,
            email,
            password,
            driver_license
        })

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        console.log(this.repository);
        const user = await this.repository.findOne({ email });

        return user;
    }
}

export { UsersRepository };