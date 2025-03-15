import 'reflect-metadata';
import { AppDataSource } from './src/data-source';
import {createConnectionDB} from "@config/db";

beforeAll(async () => {
    createConnectionDB().then()
});

afterAll(async () => {
    await AppDataSource.destroy();
});
