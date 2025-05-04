import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as taskServices from '../services/taskServices';
import { useAuth } from '../hooks/auth';

export const useTasks = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: () => taskServices.getTasksByUserId(user.id),
    enabled: !!user?.id,
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
    mutationFn: (task) => taskServices.updateTask(task.id, task),
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