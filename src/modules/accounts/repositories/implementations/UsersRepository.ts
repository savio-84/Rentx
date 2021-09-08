import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    async create({ name, password, email, username, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            email,
            password,
            driver_license
        })

        await this.repository.save(user);
    }

}

export { UsersRepository };