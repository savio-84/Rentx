import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    }

    async create({ name, password, email, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {

        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            id,
            avatar
        })

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
}

export { UsersRepository };