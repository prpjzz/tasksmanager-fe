import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    Stack,
    Typography,
    Grid,
    capitalize,
} from '@mui/material';
import TaskCardWrapper from './TaskCardWrapper';
import SnackbarAlert from '../../components/SnackbarAlert';
import { useTasks, useUpdateTask, useDeleteTask } from '../../hooks/tasks';
import { useStatusPriority } from '../../hooks/status-priority';
import { sortTasks } from '../../utils/sortTasks';

const Task = () => {
    const { statusTask, priorityTask } = useStatusPriority();
    const { data: tasks, isLoading, isFetching } = useTasks();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    const [allTasks, setAllTasks] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [response, setResponse] = useState({});
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const subTasks = tasks.reduce((acc, task) => {
                const tmp = (task.subtasks || []).map((subtask) => ({
                    ...subtask,
                    maintask: task.task_name,
                    maintask_id: task._id,
                }));
                acc.push(...tmp);
                return acc;
            }, []);

            setAllTasks(sortTasks([...tasks, ...subTasks]));
        }
    }, [tasks]);

    if (isLoading) {
        return (
            <Typography variant="h6" align="center">
                Loading...
            </Typography>
        );
    }

    if (isFetching) {
        return (
            <Typography variant="h6" align="center">
                Tải lại dữ liệu...
            </Typography>
        );
    }

    const filteredTasks = allTasks.filter((task) => {
        return (
            task.task_name.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter ? task.status._id === statusFilter : true) &&
            (priorityFilter ? task.priority._id === priorityFilter : true)
        );
    });

    const paginatedTasks = filteredTasks.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleEditTask = async (task) => {
        setResponse({});
        setSnackbarOpen(false);

        updateTask.mutate(task, {
            onSuccess: () => {
                setResponse({
                    status: 'success',
                    message: `Đã cập nhật task "${task.task_name}"`,
                });
                setSnackbarOpen(true);
            },
            onError: (error) => {
                setResponse({
                    status: 'error',
                    message: `Lỗi khi cập nhật task "${task.task_name}"`,
                });
                setSnackbarOpen(true);
            },
        });
    };

    const handleDeleteTask = async (task) => {
        setResponse({});
        setSnackbarOpen(false);

        if (task.maintask_id) {
            // Nếu là subtask thì tìm maintask chứa subtask cần xóa
            const mainTask = tasks.find((t) => t._id === task.maintask_id);
            if (mainTask) {
                // Xóa subtask khỏi maintask
                const updatedSubtasks = mainTask.subtasks.filter((subtask) => subtask._id !== task._id);

                // Update lại maintask
                updateTask.mutate(
                    {
                        ...mainTask,
                        subtasks: updatedSubtasks,
                    },
                    {
                        onSuccess: () => {
                            setResponse({
                                status: 'success',
                                message: `Đã xóa subtask "${task.task_name}"`,
                            });
                            setSnackbarOpen(true);
                        },
                        onError: (error) => {
                            setResponse({
                                status: 'error',
                                message: `Lỗi khi xoá subtask "${task.task_name}"`,
                            });
                            setSnackbarOpen(true);
                        },
                    },
                );
            }
        } else {
            // Nếu là task chính thì xóa
            deleteTask.mutate(task._id, {
                onSuccess: () => {
                    setResponse({
                        status: 'success',
                        message: `Đã xoá task "${task.task_name}"`,
                    });
                    setSnackbarOpen(true);
                },
                onError: (error) => {
                    setResponse({
                        status: 'error',
                        message: `Lỗi khi xoá task "${task.task_name}"`,
                    });
                    setSnackbarOpen(true);
                },
            });
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2}>
                Task Management
            </Typography>
            <Stack direction="row" spacing={2} mb={3}>
                <TextField label="Search Tasks" variant="outlined" value={search} onChange={handleSearchChange} />
                <FormControl vaubriant="outlined" sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        label="Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        {statusTask.map((status) => (
                            <MenuItem key={status._id} value={status._id}>
                                {capitalize(status.name)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={priorityFilter}
                        onChange={(e) => {
                            setPriorityFilter(e.target.value);
                            setPage(1);
                        }}
                        label="Priority"
                    >
                        <MenuItem value="">All</MenuItem>
                        {priorityTask.map((priority) => (
                            <MenuItem key={priority._id} value={priority._id}>
                                {capitalize(priority.name)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <Grid container spacing={2}>
                {paginatedTasks.length > 0 ? (
                    paginatedTasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                            <TaskCardWrapper task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography align="center" color="text.secondary">
                            No tasks found
                        </Typography>
                    </Grid>
                )}
            </Grid>

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(filteredTasks.length / rowsPerPage)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Box>

            {snackbarOpen && (
                <SnackbarAlert snackbarOpen={snackbarOpen} onClose={() => setSnackbarOpen(false)} response={response} />
            )}
        </Box>
    );
};

export default Task;
