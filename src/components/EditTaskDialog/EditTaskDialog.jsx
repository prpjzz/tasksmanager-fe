import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, capitalize } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import vi from 'date-fns/locale/vi';
import Selection from '../Form/Selection';
import * as taskServices from '../../services/taskServices';
import { useStatusPriority } from '../../hooks/status-priority';

const EditTaskDialog = ({ open, onClose, task, onSave }) => {
    const { statusTask, priorityTask } = useStatusPriority();
    const [editedTask, setEditedTask] = useState({
        ...task,
        extend_date: task.extend_date ? new Date(task.extend_date) : new Date(task.end_date),
    });
    const [status, setStatus] = useState(task.status._id);
    const [priority, setPriority] = useState(task.priority._id);
    const [mainTask, setMainTask] = useState(null);

    useEffect(() => {
        const fetchMainTask = async () => {
            if (open && editedTask.maintask_id) {
                const mainTask = await taskServices.getTaskById(editedTask.maintask_id);
                if (mainTask) {
                    setMainTask(mainTask);
                }
            }
        };

        fetchMainTask();
    }, [open, editedTask.maintask_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = useCallback((e) => {
        setStatus(e.target.value);
    }, []);

    const handlePriorityChange = useCallback((e) => {
        setPriority(e.target.value);
    }, []);

    const handleDateChange = (newValue) => {
        setEditedTask((prev) => ({ ...prev, extend_date: newValue }));
    };

    const handleSave = async () => {
        if (editedTask.maintask_id && editedTask.maintask_id !== '') {
            const mainTask = await taskServices.getTaskById(editedTask.maintask_id);
            if (mainTask) {
                let completed = false;
                let completed_date = null;

                let completedStatus = statusTask.find((s) => s.name === 'Completed');
                if (completedStatus && status === completedStatus._id) {
                    completed = true;
                    completed_date = new Date();
                }

                onSave({
                    ...mainTask,
                    subtasks: [
                        ...mainTask.subtasks.map((subtask) => {
                            if (subtask.id === editedTask.id) {
                                return {
                                    ...editedTask,
                                    status,
                                    priority,
                                    completed,
                                    completed_date,
                                    extend_date: editedTask.extend_date,
                                    updated_at: new Date(),
                                };
                            }
                            return subtask;
                        }),
                    ],
                });
            }
        } else {
            let completed = false;
            let completed_date = null;

            let completedStatus = statusTask.find((s) => s.name === 'Completed');
            if (completedStatus && status === completedStatus._id) {
                completed = true;
                completed_date = new Date();
            }

            onSave({
                ...editedTask,
                status,
                priority,
                extend_date: editedTask.extend_date,
                updated_at: new Date(),
                completed,
                completed_date,
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
                    name="task_description"
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
                    menuitems={useMemo(
                        () => [...statusTask.map((s) => ({ value: s._id, label: capitalize(s.name) }))],
                        [statusTask],
                    )}
                />
                <Selection
                    title="Độ ưu tiên"
                    name="priority"
                    value={priority}
                    onChange={handlePriorityChange}
                    menuitems={useMemo(
                        () => [...priorityTask.map((s) => ({ value: s._id, label: capitalize(s.name) }))],
                        [priorityTask],
                    )}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                    <DateTimePicker
                        label="Deadline"
                        value={new Date(editedTask.extend_date).getTime()}
                        onChange={handleDateChange}
                        minDateTime={new Date(editedTask.start_date).getTime()}
                        {...(mainTask && mainTask.end_date
                            ? { maxDateTime: new Date(mainTask?.extend_date ?? mainTask.end_date).getTime() }
                            : {})}
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
