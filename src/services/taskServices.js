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