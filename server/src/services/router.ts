import { SecurityUtil } from '../util/security_util';
import AuthorisedUserProfileService from './authentication/authorisedUserService';
import LoginUserService from './authentication/loginUserService';
import RegisterUserService from './authentication/registerUserService';
import AddTaskService from './task/addTaskService';
import RemoveTaskService from './task/removeTaskService';
import TaskDetailsService from './task/taskDetailsService';
import TaskDirectoryService from './task/taskDirectoryService';
import UpdateTaskService from './task/updateTaskService';
import UserDirectoryService from './user/userDirectoryService';
import UserProfileService from './user/userProfileService';

const baseUrl = '/api/v1';
module.exports = (app) => {
    // authentication router
    app.post(`${baseUrl}/auth/register`, RegisterUserService);
    app.post(`${baseUrl}/auth`, LoginUserService);
    app.get(`${baseUrl}/auth/me`, SecurityUtil.verifyAccessToken, AuthorisedUserProfileService);

    // user routers
    app.get(`${baseUrl}/users/:id`, SecurityUtil.verifyAccessToken, UserProfileService);
    app.get(`${baseUrl}/users`, SecurityUtil.verifyAccessToken, UserDirectoryService);

    // task routers
    app.post(`${baseUrl}/todos`, SecurityUtil.verifyAccessToken, AddTaskService);
    app.get(`${baseUrl}/todos`, SecurityUtil.verifyAccessToken, TaskDirectoryService);
    app.get(`${baseUrl}/todos/:id`, SecurityUtil.verifyAccessToken, TaskDetailsService);
    app.put(`${baseUrl}/todos/:id`, SecurityUtil.verifyAccessToken, UpdateTaskService);
    app.put(`${baseUrl}/todos/:id/isComplete`, SecurityUtil.verifyAccessToken, UpdateTaskService);
    app.delete(`${baseUrl}/todos/:id`, SecurityUtil.verifyAccessToken, RemoveTaskService);
};
