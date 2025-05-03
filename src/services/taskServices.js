import * as httpRequest from '../utils/httpRequest';

export const getAllTasks = async () => {
    try {
        const response = await httpRequest.get('/tasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Error fetching tasks: ' + error.message);
    }
}

export const getTasksByUserId = async (userId) => {
    try {
        const response = await getAllTasks();
        const userTasks = response.filter(task => task.userid === userId);
        return userTasks;
    } catch (error) {
        console.error('Error fetching tasks by user ID:', error);
        throw new Error('Error fetching tasks by user ID: ' + error.message);
    }
}

export const createTask = async (task) => {
    try {
        const response = await httpRequest.post('/tasks', task);
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Error creating task: ' + error.message);
    }
}

export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await httpRequest.put(`/tasks/${taskId}`, updatedTask);
        return response;
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Error updating task: ' + error.message);
    }
}

export const deleteTask = async (taskId) => {
    try {
        // If task have subtasks, convert them to main task
        const task = await getTaskById(taskId);
        if (task.subtasks && task.subtasks.length > 0) {
            await Promise.all(task.subtasks.map(async subtask => {
                await createTask({
                    ...subtask,
                    subtasks: [],
                    userid: task.userid,
                    created_at: subtask.created_at || new Date(),
                    updated_at: subtask.updated_at || new Date(),
                });
            }));
        }

        const response = await httpRequest.del(`/tasks/${taskId}`);
        return response;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Error deleting task: ' + error.message);
    }
}

export const getTaskById = async (taskId) => {
    try {
        const response = await httpRequest.get(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        throw new Error('Error fetching task by ID: ' + error.message);
    }
}