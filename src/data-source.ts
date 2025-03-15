import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entity/Task"

// @ts-ignore
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "security4321",
    database: "tasks",
    synchronize: true,
    logging: false,
    entities: [
        "src/entity/**/*.ts",
    ],
});
