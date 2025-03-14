export class InvalidRequestError extends Error {
    constructor () {
        super('Recurso não autorizado');
        this.name = 'InvalidRequestError'
    }
}
