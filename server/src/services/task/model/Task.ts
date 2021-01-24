interface TaskModel {
    id: number
    title: string
    description: string
    isComplete?: boolean | undefined | null
    userId: number
    createdAt: string
    updatedAt: string
    user: Auth
}