import {TaskValidator} from "../protocols/taskValidator";

export class TaskValidatorImpl implements TaskValidator {

    isDescriptionValid(description: string): boolean {
        return typeof description === "string";
    }

    isTaskTimeValid(task_time: number): boolean {
        return typeof task_time === "number";
    }
}
