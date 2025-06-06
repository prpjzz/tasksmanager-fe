import React, { useState } from 'react';
import {
    Container,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    MenuItem,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import SnackbarAlert from '../../components/SnackbarAlert';
import LoadingDialog from '../../components/LoadingDialog';
import { useAuth } from '../../hooks/auth';
import { useCreateSchedule } from '../../hooks/schedules';

const weekdays = [
    { label: 'Thứ 2', value: 'Monday' },
    { label: 'Thứ 3', value: 'Tuesday' },
    { label: 'Thứ 4', value: 'Wednesday' },
    { label: 'Thứ 5', value: 'Thursday' },
    { label: 'Thứ 6', value: 'Friday' },
    { label: 'Thứ 7', value: 'Saturday' },
    { label: 'Chủ nhật', value: 'Sunday' },
];

const AddSchedule = () => {
    const { user } = useAuth();
    const createSchedule = useCreateSchedule();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [repeat, setRepeat] = useState('weekly');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [response, setResponse] = useState({});

    const handleDayChange = (day) => {
        setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || selectedDays.length === 0 || !startTime || !endTime) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (startTime >= endTime) {
            alert('Giờ kết thúc phải sau giờ bắt đầu');
            return;
        }

        setResponse({});
        setSnackbarOpen(false);
        setLoading(true);

        const newSchedule = {
            title,
            userid: user._id,
            days: selectedDays,
            startTime,
            endTime,
            repeat,
        };

        createSchedule.mutate(newSchedule, {
            onSuccess: () => {
                setResponse({
                    status: 'success',
                    message: 'Thêm lịch học thành công',
                });
                setSnackbarOpen(true);
                setTitle('');
                setSelectedDays([]);
                setStartTime('');
                setEndTime('');
                setRepeat('weekly');
                setLoading(false);
            },
            onError: (error) => {
                setResponse({
                    status: 'error',
                    message: 'Có lỗi xảy ra: ' + error.message,
                });
                setSnackbarOpen(true);
                setLoading(false);
            },
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Thêm Lịch Học
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Tên môn học"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    margin="normal"
                />

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Chọn ngày học:
                </Typography>
                <FormGroup row>
                    {weekdays.map((day) => (
                        <FormControlLabel
                            key={day.value}
                            control={
                                <Checkbox
                                    checked={selectedDays.includes(day.value)}
                                    onChange={() => handleDayChange(day.value)}
                                />
                            }
                            label={day.label}
                        />
                    ))}
                </FormGroup>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid xs={6}>
                        <TextField
                            label="Giờ bắt đầu"
                            type="time"
                            fullWidth
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }}
                            required
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Giờ kết thúc"
                            type="time"
                            fullWidth
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }}
                            required
                        />
                    </Grid>
                </Grid>

                <TextField
                    select
                    label="Lặp lại"
                    fullWidth
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    margin="normal"
                >
                    <MenuItem value="weekly">Hàng tuần</MenuItem>
                    <MenuItem value="daily">Hàng ngày</MenuItem>
                    <MenuItem value="once">Một lần</MenuItem>
                </TextField>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Thêm Lịch Học
                </Button>
            </Box>

            {snackbarOpen && (
                <SnackbarAlert snackbarOpen={snackbarOpen} onClose={() => setSnackbarOpen(false)} response={response} />
            )}

            {/* Loading indicator */}
            {loading && <LoadingDialog open={loading} />}
        </Container>
    );
};

export default AddSchedule;
