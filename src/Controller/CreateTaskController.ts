
import { type HttpResponse, type HttpRequest, Controller, TaskValidator, AddTask } from './tasks-protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError, ok } from '../helpers/httpHelper'

export class CreateTaskController implements Controller {
    private readonly taskValidator: TaskValidator
    private readonly addTask: AddTask
    constructor (taskValidator: TaskValidator, addTask: AddTask) {
        this.taskValidator = taskValidator
        this.addTask = addTask
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['description', 'task_time', 'incharge_person']

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { description, task_time, incharge_person } = httpRequest.body

            const isDescriptionValid = this.taskValidator.isDescriptionValid(description)
            const isTaskTimeValid = this.taskValidator.isTaskTimeValid(task_time)

            if (!isDescriptionValid) {
                return badRequest(new InvalidParamError('description'))
            }

            if (!isTaskTimeValid) {
                return badRequest(new InvalidParamError('task_time'))
            }

            const task = await this.addTask.add({
                description,
                task_time,
                incharge_person
            })
            return ok(task)
        } catch (error) {
            return serverError()
        }
    }
}