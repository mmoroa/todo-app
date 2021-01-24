import { User } from '../../users/model/User';

export interface Task {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    createdAt: string;
    updatedAt: string;
    user: User;
}
