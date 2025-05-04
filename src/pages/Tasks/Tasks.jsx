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
    Snackbar,
    Alert,
    capitalize
} from '@mui/material';
import TaskCardWrapper from './TaskCardWrapper';
import * as taskServices from '../../services/taskServices';
import { useTasks, useUpdateTask, useDeleteTask } from '../../hooks/tasks';

const Task = () => {
    const { data: tasks, isLoading, isFetching } = useTasks();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();
    
    const [allTasks, setAllTasks] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [listStatus, setListStatus] = useState([]);
    const [listPriority, setListPriority] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchStatusAndPriority = async () => {
            try {
                const listStatus = await taskServices.getStatusTask();
                const listPriority = await taskServices.getPriorityTask();

                setListStatus(listStatus.map(s => ({ value: s.name, label: capitalize(s.name) })));
                setListPriority(listPriority.map(p => ({ value: p.name, label: capitalize(p.name) })));
            } catch (error) {
                console.error('Error fetching status and priority:', error);
            }
        };

        fetchStatusAndPriority();
    }, [])

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const subTasks = tasks.reduce((acc, task) => {
                const tmp = (task.subtasks || []).map(subtask => ({
                    ...subtask,
                    maintask: task.task_name,
                    maintask_id: task.id,
                }));
                acc.push(...tmp);
                return acc;
            }, []);

            setAllTasks([...tasks, ...subTasks]);
        }
    }, [tasks]);

    if (isLoading) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    if (isFetching) {
        return <Typography variant="h6" align="center">Tải lại dữ liệu...</Typography>;
    }

    const filteredTasks = allTasks.filter(task => {
        return (
            task.task_name.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter ? task.status === statusFilter : true) &&
            (priorityFilter ? task.priority === priorityFilter : true)
        );
    });

    const paginatedTasks = filteredTasks.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    console.log('Paginated tasks:', paginatedTasks);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleEditTask = async (task) => {
        // Logic to edit task
        console.log('Edit task:', task);

        updateTask.mutate(task, {
            onSuccess: () => {
                setSnackbarMessage(`Đã cập nhật task "${task.task_name}"`);
                setSnackbarOpen(true);
            },
            onError: (error) => {
                setSnackbarMessage(`Lỗi khi cập nhật task "${task.task_name}"`);
                console.error('Error updating task:', error);
                setSnackbarOpen(true);
            }
        });
    };

    const handleDeleteTask = async (task) => {
        // Logic to delete task
        console.log('Delete task:', task);

        if (task.maintask_id) {
            // Nếu là subtask thì tìm maintask chứa subtask cần xóa
            const mainTask = tasks.find(t => t.id === task.maintask_id);
            if (mainTask) {
                // Xóa subtask khỏi maintask
                const updatedSubtasks = mainTask.subtasks.filter(subtask => subtask.id !== task.id);

                // Update lại maintask
                updateTask.mutate({
                    ...mainTask,
                    subtasks: updatedSubtasks,
                }, {
                    onSuccess: () => {
                        setSnackbarMessage(`Đã xoá subtask "${task.task_name}"`);
                    },
                    onError: (error) => {
                        setSnackbarMessage(`Lỗi khi xoá subtask "${task.task_name}"`);
                        console.error('Error deleting subtask:', error);
                    }
                });
            }
        } else {
            // Nếu là task chính thì xóa
            deleteTask.mutate(task.id, {
                onSuccess: () => {
                    setSnackbarMessage(`Đã xoá task "${task.task_name}"`);
                },
                onError: (error) => {
                    setSnackbarMessage(`Lỗi khi xoá task "${task.task_name}"`);
                    console.error('Error deleting task:', error);
                }
            });
        }

        setSnackbarOpen(true);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2}>Task Management</Typography>
            <Stack direction="row" spacing={2} mb={3}>
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                />
                <FormControl vaubriant="outlined" sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        label="Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        {listStatus.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                                {status.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={priorityFilter}
                        onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
                        label="Priority"
                    >
                        <MenuItem value="">All</MenuItem>
                        {listPriority.map((priority) => (
                            <MenuItem key={priority.value} value={priority.value}>
                                {priority.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <Grid container spacing={2}>
                {paginatedTasks.length > 0 ? (
                    paginatedTasks.map(task => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                            <TaskCardWrapper
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography align="center" color="text.secondary">No tasks found</Typography>
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

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default Task;