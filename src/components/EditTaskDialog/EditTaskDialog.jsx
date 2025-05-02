import React, { useState, useMemo, useCallback } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import vi from 'date-fns/locale/vi';
import Selection from '../Form/Selection';
import * as taskServices from '../../services/taskServices';

const EditTaskDialog = ({ open, onClose, task, onSave }) => {
    console.log('task: ', task)

    const [editedTask, setEditedTask] = useState({
        ...task,
        end_date: task.end_date ? new Date(task.end_date) : null,
    });
    const [status, setStatus] = useState(task.status);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleStatusChange = useCallback((e) => {
        setStatus(e.target.value);
    }, []);
    
    const handleDateChange = (newValue) => {
        setEditedTask((prev) => ({ ...prev, end_date: newValue }));
    };
    
    const handleSave = async () => {
        if (editedTask.maintask_id && editedTask.maintask_id !== '') {
            const mainTask = await taskServices.getTaskById(editedTask.maintask_id);
            if (mainTask) {
                onSave({
                    ...mainTask,
                    subtasks: [
                        ...mainTask.subtasks.map((subtask) => {
                            if (subtask.id === editedTask.id) {
                                return {
                                    ...editedTask,
                                    status,
                                    end_date: editedTask.end_date,
                                    updated_at: new Date(),
                                };
                            }
                            return subtask;
                        }),
                    ],
                })
            }
        }  else {
            onSave({
                ...editedTask,
                status,
                end_date: editedTask.end_date,
                updated_at: new Date(),
            });
        }
            
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sửa Task</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Tiêu đề"
                    name="task_name"
                    fullWidth
                    value={editedTask.task_name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Mô tả"
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                    value={editedTask.task_description}
                    onChange={handleChange}
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
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                    <DateTimePicker
                        label="Deadline"
                        value={new Date(editedTask.end_date).getTime()}
                        onChange={handleDateChange}
                        minDateTime={new Date(editedTask.start_date).getTime()}
                        {...((editedTask.mainTask && editedTask.mainTask !== '') ?
                            { maxDateTime: new Date(editedTask.end_date).getTime() } : {})}
                        enableAccessibleFieldDOMStructure={false}
                        slots={{ textField: TextField }}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>   
    );
};

export default EditTaskDialog;