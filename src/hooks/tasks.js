import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as taskServices from '../services/taskServices';

export const useTasks = () => {

  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskServices.getTasksByUserId(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task) => taskServices.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task) => taskServices.updateTask(task._id, task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId) => taskServices.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });
}