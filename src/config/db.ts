import { AppDataSource } from "../data-source";

export const createConnectionDB = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log(`Conectado ao banco de dados: ${AppDataSource.options.database}`);

        process.on("SIGINT", async () => {
            await AppDataSource.destroy();
            console.log("Conexão com o banco encerrada.");
            process.exit(0);
        });

    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
};
