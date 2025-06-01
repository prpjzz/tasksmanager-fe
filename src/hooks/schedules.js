import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as taskServices from '../services/scheduleServices';
import { useAuth } from '../hooks/auth';

export const useSchedules = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['schedules', user?.id],
    queryFn: () => taskServices.getSchedulesByUserId(user.id),
    enabled: !!user?.id,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schedule) => taskServices.createSchedule(schedule),
    onSuccess: () => {
      queryClient.invalidateQueries(['schedules']);
    },
  });
}

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schedule) => taskServices.updateSchedule(schedule.id, schedule),
    onSuccess: () => {
      queryClient.invalidateQueries(['schedules']);
    },
  });
}
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scheduleServices.deleteSchedule,
    onSuccess: () => queryClient.invalidateQueries(['schedules']),
  });
}
