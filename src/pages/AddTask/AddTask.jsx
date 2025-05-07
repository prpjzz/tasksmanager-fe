import { useEffect, useState, useCallback, useMemo } from 'react';
import {
    TextField,
    Button,
    FormControl,
    Box,
    Typography,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    Snackbar,
    Alert,
    capitalize
} from '@mui/material';
import DateTimeOrTimeRangePicker from '../../components/DateTimeOrTimeRangePicker';
import Selection from '../../components/Form/Selection';
import ListTasks from '../../components/ListTasks';
import { useAuth } from '../../hooks/auth';
import { useStatusPriority } from '../../hooks/status-priority';
import { useTasks, useUpdateTask, useCreateTask } from '../../hooks/tasks';

const AddTask = () => {
    const { statusTask, priorityTask } = useStatusPriority();
    const { user } = useAuth();
    const { data: tasks } = useTasks();
    const createTask = useCreateTask();
    const updateTask = useUpdateTask();
    
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dateTimeRange, setDateTimeRange] = useState({
        start: new Date(),
        end: new Date(),
        mode: 'datetime',
    });
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [mainTasks, setMainTasks] = useState([]);
    const [subTasks, setSubTasks] = useState([]);
    const [status, setStatus] = useState('To Do');
    const [priority, setPriority] = useState('Low');
    const [mainTask, setMainTask] = useState('');
    const [taskType, setTaskType] = useState('main');
    const [response, setRespone] = useState(null);
    console.log('maintasks: ', mainTasks);
    
    useEffect(() => {
        const fetchMainTasks = () => {
            if (tasks && tasks.length > 0) {
                const activeTasks = tasks.filter(task => {
                    const currentDate = new Date();
                    return new Date(task.end_date) >= currentDate;
                });

                const subTasks = activeTasks.reduce((acc, task) => {
                    let tmp = task.subtasks.map(subtask => {
                        return {
                            ...subtask,
                            maintask: task.task_name,
                        }
                    })
                    acc.push(...tmp);
                    return acc;
                }, []);

                setMainTasks(activeTasks);
                setSubTasks(subTasks);
            }
        };

        fetchMainTasks();
    }, [tasks]);
    
    const menuitems = useMemo(() => 
        mainTasks.map(task => ({ value: task.id, label: task.task_name })),
        [mainTasks]
    );

    const handleTaskTypeChange = (e) => {
        console.log(e.target.value);
        setTaskType(e.target.value);

        if (e.target.value === 'main') {
            setDateTimeRange((prev) => {
                return {
                    ...prev,
                    start: new Date(),
                    end: new Date(),
                };
            })
        }
    };

    const handleDateTimeChange = useCallback((newRange) => {
        setDateTimeRange(newRange);
    }, []);
    
    const handleStatusChange = useCallback((event) => {
        setStatus(event.target.value);
    }, []);
    
    const handlePriorityChange = useCallback((event) => {
        setPriority(event.target.value);
    }, []);

    const handleMainTaskChange = useCallback((event) => { 
        const newValue = event.target.value;
        if (newValue === mainTask) return; // Nếu không thay đổi thì không set lại
        
        setMainTask(event.target.value);

        const selectedTask = mainTasks.find((task) => task.id === event.target.value);
        setDateTimeRange((prev) => {
            // Chỉ cập nhật nếu giá trị mới khác với giá trị hiện tại
            if (
                prev.start !== selectedTask.start_date ||
                prev.end !== selectedTask.end_date
            ) {
                return {
                    ...prev,
                    start: new Date(selectedTask.start_date).getTime(),
                    end: new Date(selectedTask.end_date).getTime(),
                };
            }
            return prev;
        });
    }, [mainTasks, mainTask]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mainTask !== '') {
            const selectedMainTask = mainTasks.find(task => task.id === mainTask);
            if (!selectedMainTask) return;

            const taskData = {
                ...selectedMainTask,
                subtasks: [
                    ...selectedMainTask.subtasks,
                    {
                        id: Date.now(),
                        task_name: taskName,
                        task_description: taskDescription,
                        status,
                        priority,
                        start_date: dateTimeRange.start,
                        end_date: dateTimeRange.end,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
                ],
            };
            updateTask.mutate(taskData, {
                onSuccess: () => {
                    setRespone({
                        status: "success",
                        message: `Thêm subtask "${taskName}" thành công`
                    });
                }
            });
        } else {
            const taskData = {
                userid: user.id,
                task_name: taskName,
                task_description: taskDescription,
                status,
                priority,
                start_date: dateTimeRange.start,
                end_date: dateTimeRange.end,
                subtasks: [],
                created_at: new Date(),
                updated_at: new Date(),
            };
            createTask.mutate(taskData, {
                onSuccess: () => {
                    setRespone({
                        status: "success",
                        message: `Thêm task "${taskName}" thành công`
                    });
                }
            });
        }

        setTaskName('');
        setTaskDescription('');
        setMainTask('');
        setSnackbarOpen(true);
    };

    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 5 }}
        >
            <Box sx={{ flex: 1, maxWidth: 600 }}>
                <Typography variant="h4" mb={3}>Thêm Task mới</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên Task"
                        name="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
    
                    <TextField
                        label="Mô tả"
                        name="description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
    
                     <Selection
                        title="Trạng thái"
                        name="status"
                        value={status}
                        onChange={handleStatusChange}
                        menuitems={useMemo(() => [
                            ...statusTask.map(s => ({ value: s.name, label: capitalize(s.name) })),
                        ], [statusTask])}
                    />
    
                    <Selection
                        title="Độ ưu tiên"
                        name="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                        menuitems={useMemo(() => [
                            ...priorityTask.map(p => ({ value: p.name, label: capitalize(p.name) })),
                        ], [priorityTask])}
                    /> 
    
                    {mainTasks && mainTasks.length > 0 ? (
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Chọn loại task</FormLabel>
                            <RadioGroup row aria-label="taskType" name="taskType" value={taskType} onChange={handleTaskTypeChange}>
                                <FormControlLabel value="main" control={<Radio />} label="Task chính" />
                                <FormControlLabel value="sub" control={<Radio />} label="Task phụ" />
                            </RadioGroup>
                        </FormControl> 
                    ): (
                        <FormLabel component="legend">Loại task: Main task</FormLabel>
                    )}
    
                    {taskType === 'sub' && (
                        <Selection
                            title="Chọn task chính"
                            name="mainTask"
                            value={mainTask}
                            onChange={handleMainTaskChange}
                            menuitems={menuitems}
                        />
                    )} 
    
                    <Divider sx={{ my: 2 }} />
    
                     <FormControl fullWidth margin="normal">
                        <DateTimeOrTimeRangePicker
                            value={dateTimeRange}
                            mainTask={mainTask}
                            onChange={handleDateTimeChange}
                        />
                    </FormControl> 
    
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Thêm Task
                    </Button>
                </form>
            </Box>

            <Box sx={{ flex: 1, maxWidth: 600 }}>
                <Typography variant="h4" mb={3}>Danh sách task</Typography>
                <ListTasks
                    tasks={useMemo(() => [
                        ...mainTasks,
                        ...subTasks,
                    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    , [mainTasks, subTasks])} 
                />
            </Box>
            
            {response && (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={response.success} variant="filled">
                        {response.message}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
}

export default AddTask;