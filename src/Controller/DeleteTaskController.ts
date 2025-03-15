import { type HttpResponse, type HttpRequest, Controller } from '../protocols';
import { badRequest, notFoundError, ok, serverError } from '../helpers/httpHelper';
import { InvalidParamError } from '../errors';
import { DeleteTask } from '../useCases/DeleteTask';

export class DeleteTaskController implements Controller {
    private readonly deleteTaskUseCase: DeleteTask;

    constructor(deleteTaskUseCase: DeleteTask) {
        this.deleteTaskUseCase = deleteTaskUseCase;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new InvalidParamError('Task ID is required!'));
            }

            await this.deleteTaskUseCase.delete(Number(id));

            return ok({ message: 'Task deleted successfully' });
        } catch (error) {
            if (error.message === 'Task not found') {
                return notFoundError();
            }
            console.error(error);
            return serverError();
        }
    }
}
