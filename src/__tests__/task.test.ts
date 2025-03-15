import request from 'supertest';
import { app } from '../app';
import { AppDataSource } from '../data-source';
import * as jwt from "jsonwebtoken";
import {TaskModel} from "@config/models/task";

let token: string;
describe('Task API', () => {
    beforeAll(async () => {
        try {
            if (!AppDataSource.isInitialized) {
                await AppDataSource.initialize();
            }
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error);
        }

        const requestToken = jwt.sign(
            { message: "Token gerado com sucesso!" },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )

        token = requestToken;
    });

afterAll(async () => {
        try {
            if (AppDataSource.isInitialized) {
                await AppDataSource.destroy();
            }
        } catch (error) {
            console.error("Erro ao fechar conexão com o banco:", error);
        }
});

    it('Deve buscar todas as tarefas', async () => {
        const res = await request(app).get('/tasks/get').set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });


    it('Deve buscar uma tarefa especifica', async () => {
        const task = await request(app)
            .post('/tasks/add')
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "task teste", description: "Test Task", task_time: 3, incharge_person: "John" });

        const res = await request(app).get(`/tasks/get/${task.body.id}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('description');

        request(app)
            .delete(`/tasks/delete/${task.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();
    });

    it('Deve falhar ao buscar uma tarefa especifica', async () => {
        const res = await request(app).get(`/tasks/get/100000`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
    });

    it('Deve criar uma nova tarefa', async () => {
        const res = await request(app)
            .post('/tasks/add')
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "task teste", description: "Test Task", task_time: 3, incharge_person: "John" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id');

        request(app)
            .delete(`/tasks/delete/${res.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();
    });

    it('Deve falhar ao criar tarefa sem dados obrigatórios', async () => {
        const res = await request(app).post('/tasks/add').set("Authorization", `Bearer ${token}`).send({});
        expect(res.status).toBe(400);
    });

    it('Deve deletar uma tarefa', async () => {
        const task = await request(app)
            .post('/tasks/add')
            .set("Authorization", `Bearer ${token}`)
            .send({ title:"task para deletar", description: "Task to delete", task_time: 2, incharge_person: "Doe" });

        const res = await request(app).delete(`/tasks/delete/${task.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();
        expect(res.status).toBe(200);
    });

    it('Deve falhar ao deletar uma tarefa', async () => {
        const res = await request(app).delete(`/tasks/delete/100000`)
            .set("Authorization", `Bearer ${token}`)
            .send();
        expect(res.status).toBe(404);
    });

    it('Deve editar uma tarefa', async () => {
        const task = await request(app)
            .post('/tasks/add')
            .set("Authorization", `Bearer ${token}`)
            .send({ title:"task para deletar", description: "Task to delete", task_time: 2, incharge_person: "Doe" });

        const res = await request(app).put(`/tasks/update/${task.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ title:"task para deletar depois de editar", description: "Task editada", task_time: 25, incharge_person: "Doe" });
        expect(res.status).toBe(200);

        await request(app).delete(`/tasks/delete/${task.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();
    });

    it('Deve falhar ao editar uma tarefa', async () => {
        const task = await request(app)
            .post('/tasks/add')
            .set("Authorization", `Bearer ${token}`)
            .send({ title:"task para deletar", description: "Task to delete", task_time: 2, incharge_person: "Doe" });

        const res = await request(app).put(`/tasks/update/${task.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();
        expect(res.status).toBe(400);

        await request(app).delete(`/tasks/delete/${task.body.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();
    });
});
