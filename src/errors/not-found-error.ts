export class NotFoundError extends Error {
    constructor () {
        super('Tarefa Não encontrada!');
        this.name = 'NotFoundError'
    }
}