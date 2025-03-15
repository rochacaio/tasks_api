export class InvalidRequestError extends Error {
    private statusError: number;
    constructor (message = "Unauthorized") {
        super(message);
        this.name = 'InvalidRequestError'
        this.statusError = 401
    }
}
