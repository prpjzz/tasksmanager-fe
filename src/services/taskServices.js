import * as httpRequest from '../utils/httpRequest';

export const getAllTasks = async () => {
    try {
        const response = await httpRequest.get('/tasks');
        return response;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Error fetching tasks: ' + error.message);
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