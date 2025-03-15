export interface TaskModel {
    id: number
    description: string
    task_time: number
    incharge_person?: string
    title: string
    completed?: boolean
    started?: boolean
}