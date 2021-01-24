import { TaskRepository } from "../../database/repository";
import { DEFAULT_INTERNAL_ERROR_MESSAGE } from "../../util/constant";

const RemoveTaskService = async (req, res) => {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;
    
    if((!userId) || (!taskId)) {
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {
                id: "invalid user id"
            }
        });
    }

    // initiate task removal
    TaskRepository.delete(taskId).then(data => {
        return res.status(201).send({
            message: "removed successfully",
            data
        });
    }).catch(err => {
        // throw a exception
        console.error(err.message);
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {},
        });
    })
}

export default RemoveTaskService;