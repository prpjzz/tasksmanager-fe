import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EditScheduleDialog = ({ open, onClose, onSave, schedule }) => {
    const [form, setForm] = useState({
        title: '',
        days: [],
        startTime: '',
        endTime: '',
        repeat: '',
    });

    useEffect(() => {
        if (schedule) {
            setForm({
                title: schedule.title || '',
                days: schedule.days || [],
                startTime: schedule.startTime || '',
                endTime: schedule.endTime || '',
                repeat: schedule.repeat || '',
            });
        }
    }, [schedule]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!form.title || !form.days.length || !form.startTime || !form.endTime || !form.repeat) return;
        onSave({ ...schedule, ...form });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Chỉnh sửa lịch học</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <FormControl fullWidth>
                    <TextField label="Tên lịch học" name="title" value={form.title} onChange={handleChange} fullWidth />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Chọn thứ</InputLabel>
                    <Select
                        name="days"
                        multiple
                        value={form.days}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {weekdays.map((day) => (
                            <MenuItem key={day} value={day}>
                                <Checkbox checked={form.days.includes(day)} />
                                <ListItemText primary={day} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Giờ bắt đầu"
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Giờ kết thúc"
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    select
                    label="Lặp lại"
                    fullWidth
                    name="repeat"
                    value={form.repeat}
                    onChange={handleChange}
                    margin="normal"
                >
                    <MenuItem value="weekly">Hàng tuần</MenuItem>
                    <MenuItem value="daily">Hàng ngày</MenuItem>
                    <MenuItem value="once">Một lần</MenuItem>
                </TextField>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" onClick={handleSave}>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditScheduleDialog;
