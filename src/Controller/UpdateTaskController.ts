import { type HttpResponse, type HttpRequest, Controller } from "../protocols";
import { badRequest, notFoundError, ok, serverError } from "../helpers/httpHelper";
import { UpdateTaskUseCase } from "../useCases/updateTask";
import {InvalidParamError, MissingParamError} from "../errors";
import {InvalidRequestError} from "../errors/invalid-request-error";

export class UpdateTaskController implements Controller {
    private readonly updateTaskUseCase: UpdateTaskUseCase;

    constructor(updateTaskUseCase: UpdateTaskUseCase) {
        this.updateTaskUseCase = updateTaskUseCase;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const body = httpRequest.body;

            if (!Object.keys(body).length) {
                return badRequest(new MissingParamError('Body is required!'))
            }

            const task = await this.updateTaskUseCase.update(Number(id),{
                ...body,
                update_date: new Date()
            });

            return ok({
                message: "Task updated successfully",
                task,
            });
        } catch (error) {
            if (error instanceof InvalidParamError) {
                return badRequest(error);
            }
            if (error.message === "Task not found") {
                return notFoundError();
            }
            console.error(error);
            return serverError();
        }
    }
}
