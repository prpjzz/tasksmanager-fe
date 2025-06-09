import * as httpRequest from '../utils/httpRequest';

export const getProfile = async () => {
  try {
    const response = await httpRequest.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Error fetching profile: ' + error.message);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await httpRequest.put('/profile', data);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Error updating profile: ' + error.message);
  }
};