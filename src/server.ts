import 'dotenv/config';
import {app} from "./app";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

// ao finalizar um processo o app também é finalizado
process.on('SIGINT', () => {
    server.close();
});