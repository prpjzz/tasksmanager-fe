// Todos.jsx (dùng MUI + mutation update status)
import React from 'react';
import { useTasks } from '../../hooks/tasks';
import dayjs from 'dayjs';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Button
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as taskServices from '../../services/taskServices';

const TaskCard = ({ task, onComplete }) => {
    const isOverdue = dayjs(task?.extend_date || task.end_date).isBefore(dayjs());
    const isSoon = dayjs(task?.extend_date || task.end_date).diff(dayjs(), 'day') <= 3 && !isOverdue;

    return (
        <Card
            variant="outlined"
            sx={{
                borderLeft: `6px solid ${isOverdue ? '#f44336' : isSoon ? '#ffa726' : '#2196f3'
                    }`,
                mb: 2
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{task.task_name}</Typography>
                    {task.status?.name !== 'Hoàn thành' && (
                        <Button variant="outlined" size="small" onClick={() => onComplete(task)}>
                            Hoàn thành
                        </Button>
                    )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {task.task_description}
                </Typography>
                <Typography variant="caption">
                    Hạn: {dayjs(task.end_date).format('DD/MM/YYYY')}
                </Typography>
                {task.maintask_name && (
                    <Typography variant="caption" display="block" color="text.secondary">
                        Task phụ của: {task.maintask_name}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

const TaskSection = ({ title, tasks, onComplete }) => (
    <Box mb={4}>
        <Typography variant="h5" gutterBottom>
            {title}
        </Typography>
        {tasks.length === 0 ? (
            <Typography color="text.secondary">Không có công việc nào.</Typography>
        ) : (
            tasks.map(task => (
                <TaskCard key={task._id || task.id} task={task} onComplete={onComplete} />
            ))
        )}
    </Box>
);

const Todos = () => {
    const { data: tasks = [], isLoading } = useTasks();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, status }) => taskServices.updateTaskStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });

    const completedStatusId = 'your_completed_status_id_here'; // thay bằng ObjectId thật

    const handleComplete = (task) => {
        mutation.mutate({ id: task._id || task.id, status: completedStatusId });
    };

    const today = dayjs();
    const upcoming = today.add(3, 'day');

    const allSubtasks = tasks.flatMap(task =>
        task.subtasks?.map(sub => ({
            ...sub,
            maintask_id: task._id,
            maintask_name: task.task_name
        })) || []
    );
    const allTasks = [...tasks, ...allSubtasks];
    
    const todayTasks = allTasks.filter(task =>
        dayjs(task.end_date).isSame(today, 'day')
    );
    const upcomingTasks = allTasks.filter(task =>
        dayjs(task.end_date).isAfter(today, 'day') &&
        dayjs(task.end_date).isBefore(upcoming, 'day')
    );
    const overdueTasks = allTasks.filter(task =>
        dayjs(task.end_date).isBefore(today, 'day') && task.status?.name !== 'Hoàn thành'
    );

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Việc cần làm
            </Typography>
            {isLoading ? (
                <Typography>Đang tải công việc...</Typography>
            ) : (
                <Grid container spacing={2}>
                    <Grid xs={12} md={8}>
                        <TaskSection title="Hôm nay" tasks={todayTasks} onComplete={handleComplete} />
                        <TaskSection title="Sắp đến hạn (3 ngày tới)" tasks={upcomingTasks} onComplete={handleComplete} />
                        <TaskSection title="Quá hạn" tasks={overdueTasks} onComplete={handleComplete} />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Todos;
