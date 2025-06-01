import * as httpRequest from '../utils/httpRequest';

export const getSchedulesByUserId = async (userId) => {
    try {
        const response = await httpRequest.get('/schedules');
        const userSchedules = response.data.filter(schedule => schedule.userid === userId);
        return userSchedules;
    } catch (error) {
        console.error('Error fetching schedules by user ID:', error);
        throw new Error('Error fetching schedules by user ID: ' + error.message);
    }
}

export const createSchedule = async (schedule) => {
    try {
        const response = await httpRequest.post('/schedules', schedule);
        return response.data;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw new Error('Error creating schedule: ' + error.message);
    }
}

export const updateSchedule = async (scheduleId, updatedSchedule) => {
    try {
        const response = await httpRequest.put(`/schedules/${scheduleId}`, updatedSchedule);
        return response.data;
    } catch (error) {
        console.error('Error updating schedule:', error);
        throw new Error('Error updating schedule: ' + error.message);
    }
}
export const deleteSchedule = async (scheduleId) => {
  try {
    const response = await fetch(`http://localhost:3001/schedules/${scheduleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete schedule');
    return { id: scheduleId };
  } catch (error) {
    throw new Error('Error deleting schedule: ' + error.message);
  }
}