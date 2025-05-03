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
} from '@mui/material';
import TaskCardWrapper from './TaskCardWrapper';
import * as taskServices from '../../services/taskServices';
import { useAuth } from '../../contexts/AuthContext';

const Task = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await taskServices.getTasksByUserId(user.id);
                if (response && response.length > 0) {
                    const activeTasks = response;

                    const subTasks = activeTasks.reduce((acc, task) => {
                        let tmp = task.subtasks.map(subtask => {
                            return {
                                ...subtask,
                                maintask: task.task_name,
                                maintask_id: task.id,
                            }
                        })
                        acc.push(...tmp);
                        return acc;
                    }, []);

                    setTasks([...activeTasks, ...subTasks]);
                }
            } catch (error) {
                console.error('Error fetching main tasks:', error);
            }
        };
        fetchTasks();
    }, [user.id]);

    const filteredTasks = tasks.filter(task => {
        return (
            task.task_name.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter ? task.status === statusFilter : true) &&
            (priorityFilter ? task.priority === priorityFilter : true)
        );
    });

    const paginatedTasks = filteredTasks.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleEditTask = async (task) => {
        // Logic to edit task
        console.log('Edit task:', task);

        try {
            await taskServices.updateTask(task.id, task);

            // Set lại dữ liệu tasks mới
                let mainTasks = tasks.map(t => t.id === task.id ? { ...task, subtasks: task.subtasks } : t);
                // Lọc ra các task chính (task không có maintask_id)
                mainTasks = mainTasks.filter(t => t.subtasks && t.subtasks.length >= 0);
            
                console.log('mainTasks', mainTasks);
                const subTasks = mainTasks.reduce((acc, task) => {
                    // task không có subtasks thì không cần xử lý   
                    if (!task.subtasks || task.subtasks.length === 0) return acc;
            
                    let tmp = task.subtasks.map(subtask => {
                        return {
                            ...subtask,
                            maintask: task.task_name,
                            maintask_id: task.id,
                        }
                    })
                    acc.push(...tmp);
                    return acc;
                }, []);
                console.log('subTasks', subTasks);
                setTasks([...mainTasks, ...subTasks]);
            
            setSnackbarMessage('Đã cập nhật thành công');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating task:', error);
            setSnackbarMessage(`Lỗi khi cập nhật task "${task.task_name}"`);
            setSnackbarOpen(true);
        }
    };

    const handleDeleteTask = async (task) => {
        // Logic to delete task
        console.log('Delete task:', task);
        
        try {
            if (task.maintask_id) {
                const mainTask = tasks.find(t => t.id === task.maintask_id);
                if (mainTask) {
                    // Nếu là subtask thì tìm maintask chứa subtask cần xóa
                    const updatedSubtasks = mainTask.subtasks.filter(subtask => subtask.id !== task.id);

                    // Update lại maintask
                    await taskServices.updateTask(mainTask.id, { ...mainTask, subtasks: updatedSubtasks });

                    setTasks(tasks.map(t => t.id === mainTask.id ? { ...mainTask, subtasks: updatedSubtasks } : t));
                    setSnackbarMessage(`Đã xoá subtask "${task.task_name}"`);
                }
            } else {
                // Nếu là task chính thì xóa
                await taskServices.deleteTask(task.id);
                setSnackbarMessage(`Đã xoá task "${task.task_name}"`);
            }
    
            setTasks(tasks.filter(t => t.id !== task.id));
        } catch (error) {
            setSnackbarMessage(`Lỗi khi xoá task "${task.task_name}"`);
            console.error('Error deleting task:', error);
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
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
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
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
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