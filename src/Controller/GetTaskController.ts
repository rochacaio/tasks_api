import { GetTaskUseCase } from "../useCases/getTask";
import { serverError, ok, notFoundError } from "../helpers/httpHelper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class GetTaskController implements Controller {
    private readonly getTaskUseCase: GetTaskUseCase;

    constructor(getTaskUseCase: GetTaskUseCase) {
        this.getTaskUseCase = getTaskUseCase;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const taskId = id ? parseInt(id, 10) : undefined;

            if(taskId){
                const task = await this.getTaskUseCase.getById(taskId);

                if(! task){return notFoundError();}

                return ok(task);
            }

            const tasks = await this.getTaskUseCase.getAll();

            if (! tasks) {return notFoundError();}

            return ok(tasks);
        } catch (error) {
            console.log(error)
            return serverError();
        }
    }
}
