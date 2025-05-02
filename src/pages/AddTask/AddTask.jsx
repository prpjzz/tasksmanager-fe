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
    Alert
} from '@mui/material';
import DateTimeOrTimeRangePicker from '../../components/DateTimeOrTimeRangePicker';
import Selection from '../../components/Form/Selection';
import ListTasks from '../../components/ListTasks';
import * as taskServices from '../../services/taskServices';
import { useAuth } from '../../contexts/AuthContext';

const AddTask = () => {
    const { user } = useAuth();
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
    const [status, setStatus] = useState('not_started');
    const [priority, setPriority] = useState('low');
    const [mainTask, setMainTask] = useState('');
    const [taskType, setTaskType] = useState('main');
    const [response, setRespone] = useState(null);
    
    useEffect(() => {
        const fetchMainTasks = async () => {
            try {
                const response = await taskServices.getTasksByUserId(user.id);
                if (response && response.length > 0) {
                    const activeTasks = response.filter(task => {
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
            } catch (error) {
                console.error('Error fetching main tasks:', error);
            }
        };
        fetchMainTasks();
    }, [user.id]);
    
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
            setMainTasks(prev => prev.map(task => task.id === mainTask ? taskData : task));
            setSubTasks(prev => {
                return [
                    ...prev, 
                    {
                        task_name: taskName,
                        task_description: taskDescription,
                        maintask: selectedMainTask.task_name,
                        status,
                        priority,
                        start_date: dateTimeRange.start,
                        end_date: dateTimeRange.end,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
                ]
            })
            setRespone({
                status: "success",
                message: `Thêm task phụ "${taskName}" vào "${selectedMainTask.task_name}" thành công`
            });
            setSnackbarOpen(true);
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
            try {
                const response = await taskServices.createTask(taskData);
                console.log('Task created successfully:', response.data);
                setRespone({
                    status: "success",
                    message: "Thêm công việc thành công"
                });
                setMainTasks(prev => prev.map(task => task.id === mainTask ? taskData : task));
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error creating task:', error);
                setRespone({
                    status: "error",
                    message: "Thêm công việc thất bại, có lỗi xảy ra. Vui lòng thử lại sau"
                });
                setSnackbarOpen(true);
            }
        }

        setTaskName('');
        setTaskDescription('');
        setMainTask('');
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
                            { value: 'not_started', label: 'Chưa bắt đầu' },
                            { value: 'in_progress', label: 'Đang tiến hành' },
                            { value: 'completed', label: 'Đã hoàn thành' },
                        ], [])}
                    />
    
                    <Selection
                        title="Độ ưu tiên"
                        name="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                        menuitems={useMemo(() => [
                            { value: 'low', label: 'Thấp' },
                            { value: 'medium', label: 'Trung bình' },
                            { value: 'high', label: 'Cao' },
                        ], [])}
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
                    ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
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