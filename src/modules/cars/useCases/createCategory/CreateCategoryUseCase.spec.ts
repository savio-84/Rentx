import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from "../../../../errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })


    // verifica se é possível criar uma categoria
    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category description test'
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    })

    // verifica se não é possível criar uma categoria com um nome que já exista
    it('should be to be able to create a new category with name exists', async () => {
        // verifica se esse ao criar 2 categorias iguais o erro retornado é uma instância de AppError - portanto já foi tratado.
        expect(async () => {
            const category = {
                name: 'Category Test',
                description: 'Category description test'
            }

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    // it('2 + 2 must be 4', () => {
    //     const soma = 2 + 2;

    //     const result = 4;

    //     expect(soma).toBe(result);
    // })

    // it('2 + 2 must not be 5', () => {
    //     const soma = 2 + 2;
    //     const result = 5;

    //     expect(soma).not.toBe(result);
    // })
});