import { Task } from '../../tasks/model/Task';

export interface User {
    id: number;
    role: string;
    email: string;
    username: string;
    createdAt: string;
    tasks?: [Task];
}

export type AuthProfile =
    | {
          id: number;
          role: string;
          email: string;
          username: string;
          createdAt: string;
      }
    | undefined;
