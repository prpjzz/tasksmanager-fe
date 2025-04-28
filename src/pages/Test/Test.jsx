import { useMemo, useReducer, useCallback } from 'react';
import { TextField } from '@mui/material';
import Selection from '../../components/Form/Selection';
import {
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
// Khai báo reducer
const initialState = {
    taskName: '',
    taskDescription: '',
    status: '',
    priority: '',
    taskType: 'main',
  };
  
  function formReducer(state, action) {
    switch (action.type) {
      case 'SET_TASK_NAME':
        return { ...state, taskName: action.payload };
      case 'SET_TASK_DESCRIPTION':
        return { ...state, taskDescription: action.payload };
      case 'SET_STATUS':
        return { ...state, status: action.payload };
      case 'SET_PRIORITY':
        return { ...state, priority: action.payload };
      case 'SET_TASK_TYPE':
        return { ...state, taskType: action.payload };
      default:
        return state;
    }
  }
const Test = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    // Hàm để dispatch action cập nhật taskName
    const handleTaskNameChange = (e) => {
        dispatch({ type: 'SET_TASK_NAME', payload: e.target.value });
    };

    // Hàm để dispatch action cập nhật taskDescription
    const handleTaskDescriptionChange = (e) => {
        dispatch({ type: 'SET_TASK_DESCRIPTION', payload: e.target.value });
    };

    const handleTaskTypeChange = (e) => {
        dispatch({ type: 'SET_TASK_TYPE', payload: e.target.value });
    }

    const handleStatusChange = useCallback((e) => {
        dispatch({ type: 'SET_STATUS', payload: e.target.value });
    }, []);


    const handlePriorityChange = useCallback((e) => {
        dispatch({ type: 'SET_PRIORITY', payload: e.target.value });
    }, []);

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
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

            <Selection
                title="Trạng thái"
                name="status"
                value={state.status}
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
                value={state.priority}
                onChange={handlePriorityChange}
                menuitems={useMemo(() => [
                    { value: 'low', label: 'Thấp' },
                    { value: 'medium', label: 'Trung bình' },
                    { value: 'high', label: 'Cao' },
                ], [])}
            />

            <FormControl component="fieldset">
                <FormLabel component="legend">Chọn loại task</FormLabel>
                <RadioGroup row aria-label="taskType" name="taskType" value={state.taskType} onChange={handleTaskTypeChange}>
                    <FormControlLabel value="main" control={<Radio />} label="Task chính" />
                    <FormControlLabel value="sub" control={<Radio />} label="Task phụ" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default Test;