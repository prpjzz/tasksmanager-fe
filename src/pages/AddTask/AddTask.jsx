import { useEffect, useState, useCallback, useMemo, useReducer } from 'react';
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
    Divider
} from '@mui/material';
import DateTimeOrTimeRangePicker from '../../components/DateTimeOrTimeRangePicker';
import Selection from '../../components/Form/Selection';
import * as taskServices from '../../services/taskServices'; // Import task service
// Khai báo reducer
const initialState = {
    taskName: '',
    taskDescription: '',
};

function formReducer(state, action) {
    switch (action.type) {
        case 'SET_TASK_NAME':
        return { ...state, taskName: action.payload };
        case 'SET_TASK_DESCRIPTION':
        return { ...state, taskDescription: action.payload };
        default:
        return state;
    }
}
const AddTask = () => {
    const [dateTimeRange, setDateTimeRange] = useState({
        start: new Date(),
        end: new Date(),
        mode: 'datetime',
    });
    const [mainTasks, setMainTasks] = useState([]);
    const [status, setStatus] = useState('not_started');
    const [priority, setPriority] = useState('low');
    const [mainTask, setMainTask] = useState('');
    const [taskType, setTaskType] = useState('main');
    
    useEffect(() => {
        const fetchMainTasks = async () => {
            try {
                const response = await taskServices.getAllTasks();
                if (response.data && response.data.length > 0) {
                    const activeTasks = response.data.filter(task => {
                        const currentDate = new Date();
                        return new Date(task.start_date) <= currentDate && new Date(task.end_date) >= currentDate;
                    });
                    setMainTasks(activeTasks);
                }
            } catch (error) {
                console.error('Error fetching main tasks:', error);
            }
        };
        fetchMainTasks();
    }, []);

    const [state, dispatch] = useReducer(formReducer, initialState);

    // Hàm để dispatch action cập nhật taskName
    const handleTaskNameChange = (e) => {
        dispatch({ type: 'SET_TASK_NAME', payload: e.target.value });
    };

    // Hàm để dispatch action cập nhật taskDescription
    const handleTaskDescriptionChange = (e) => {
        dispatch({ type: 'SET_TASK_DESCRIPTION', payload: e.target.value });
    };
    
    const menuitems = useMemo(() => 
        mainTasks.map(task => ({ value: task.id, label: task.task_name })),
        [mainTasks]
    );

    const handleTaskTypeChange = (e) => {
        console.log(e.target.value);
        setTaskType(e.target.value);
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
        console.log(selectedTask);
        setDateTimeRange((prev) => {
            // Chỉ cập nhật nếu giá trị mới khác với giá trị hiện tại
            if (
                prev.start !== selectedTask.start_date ||
                prev.end !== selectedTask.end_date
            ) {
                return {
                    ...prev,
                    start: selectedTask.start_date,
                    end: selectedTask.end_date,
                };
            }
            return prev;
        });
    }, [mainTasks, mainTask]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.taskName || !state.taskDescription) {
            alert('Vui lòng điền tên và mô tả cho task!');
            return;
        }
        
        if (!dateTimeRange.start || !dateTimeRange.end) {
            alert('Vui lòng chọn khoảng thời gian cho task!');
            return;
        }
        
        if (mainTask !== '') {
            const selectedMainTask = mainTasks.find(task => task.id === mainTask);
            const taskData = {
                ...selectedMainTask,
                subtasks: [
                    ...selectedMainTask.subtasks,
                    {
                        task_name: state.taskName,
                        task_description: state.taskDescription,
                        status,
                        priority,
                        start_date: dateTimeRange.start,
                        end_date: dateTimeRange.end,
                    }
                ],
            };
            console.log(taskData);
        } else {
            const taskData = {
                task_name: state.taskName,
                task_description: state.taskDescription,
                status,
                priority,
                start_date: dateTimeRange.start,
                end_date: dateTimeRange.end,
                subtasks: [],
            };
            console.log(taskData);

            try {
                const response = await taskServices.createTask(taskData);
                console.log('Task created successfully:', response.data);
            } catch (error) {
                console.error('Error creating task:', error);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" mb={3}>Thêm Task mới</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Tên Task"
                    name="taskName"
                    value={state.taskName}
                    onChange={handleTaskNameChange}
                    fullWidth
                    required
                    margin="normal"
                />

                <TextField
                    label="Mô tả"
                    name="description"
                    value={state.taskDescription}
                    onChange={handleTaskDescriptionChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />

                {/* <Selection
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
                /> */}
        
                {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Chọn loại task</FormLabel>
                    <RadioGroup row aria-label="taskType" name="taskType" value={taskType} onChange={handleTaskTypeChange}>
                        <FormControlLabel value="main" control={<Radio />} label="Task chính" />
                        <FormControlLabel value="sub" control={<Radio />} label="Task phụ" />
                    </RadioGroup>
                </FormControl> */}

                {/* {taskType === 'sub' && (
                    <Selection
                        title="Chọn task chính"
                        name="mainTask"
                        value={mainTask}
                        onChange={handleMainTaskChange}
                        menuitems={menuitems}
                    />
                )} */}

                <Divider sx={{ my: 2 }} />

                {/* <FormControl fullWidth margin="normal">
                    <DateTimeOrTimeRangePicker
                        value={dateTimeRange}
                        onChange={handleDateTimeChange}
                    />
                </FormControl> */}

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Thêm Task
                </Button>
            </form>
        </Box>
    );                    
}

export default AddTask;