import "typescript-transform-paths";
import app from "../src/index";
import supertest from "supertest";
import fruits from "../src/data/fruits";

const api = supertest(app);

beforeAll(() => {
    fruits.slice(0, fruits.length)
    console.log(fruits)
})

describe('GET /fruits', () => {

    it('should respond with status 200', async () => {
        const result = await api.get('/fruits');

        expect(result.status).toBe(200);
    })

    it('should respond with empty array if has no fruits', async () => {
        const result = await api.get('/fruits');

        expect(result.body).toEqual([]);
    })

    it('should respond with status 200 and appear posted body', async () => {
        const body = {
            "name": "Uva",
            "price": 8.00
        };
        const post = await api.post('/fruits').send(body);

        expect(post.status).toBe(201);
        
        const result = await api.get('/fruits');
        
        expect(result.status).toBe(200);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })

})

describe('GET /fruits/:id', () => {
    it('should respond with status 404 if invalid id fruit', async () => {
        const result = await api.get('/fruits/3');

        expect(result.status).toBe(404);
    })

    it('should respond with status 200 if valid id fruit', async () => {
        const body = {
            "name": "Uva",
            "price": 8.00
        };

        await api.post('/fruits').send(body);
        const result = await api.get('/fruits/1');

        expect(result.body.id).toEqual(1);
        expect(result.status).toBe(200)
    })
})

describe('POST /fruits', () => {
    it('should respond with status 422 if body has no price', async () => {
        const body = {
            "name": "Uva"
        };
        const result = await api.post('/fruits').send(body);
        expect(result.status).toBe(422);
        
    })

    it('should respond with status 422 if body has no name', async () => {
        const body = {
            "price": 8.00
        };
        const result = await api.post('/fruits').send(body);
        expect(result.status).toBe(422);
        
    })

    it('should respond with status 409 if body already exist', async () => {
        const body = {
            "name": "Uva",
            "price": 8.00
        };
        const result = await api.post('/fruits').send(body);
        expect(result.status).toBe(409);
        
    })

    it('should respond with status 201 if body is valid', async () => {
        const body = {
            "name": "Banana",
            "price": 5.00
        };
        const result = await api.post('/fruits').send(body);
        expect(result.status).toBe(201);
        
    })

})