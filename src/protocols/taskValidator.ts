export interface TaskValidator {
  isDescriptionValid: (description: string) => boolean
  isTaskTimeValid: (task_time: number) => boolean
}
