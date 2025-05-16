import React, { useEffect, useState } from 'react';
import {
    Box, Card, CardContent, Typography, Avatar, Grid, Container, Divider
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { useAuth } from '../../hooks/auth';
import * as taskServices from '../../services/taskServices';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfilePage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        inProgress: 0,
        overdue: 0,
        subtasks: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await taskServices.getTaskStatistics();
                setStats(data);
            } catch (error) {
                console.error('Error fetching task statistics:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ width: 64, height: 64 }}>{user.name.charAt(0)}</Avatar>
                        <Box>
                            <Typography variant="h5">{user.name}</Typography>
                            <Typography color="text.secondary">Email: {user.email}</Typography>
                            <Typography color="text.secondary">Thành viên từ: {new Date(user.createdAt).toLocaleDateString()}</Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom>Thống kê công việc</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Card sx={{ backgroundColor: '#e3f2fd' }}>
                                <CardContent>
                                    <Typography color="text.secondary">Tổng công việc</Typography>
                                    <Typography variant="h5" fontWeight="bold">{stats.total}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card sx={{ backgroundColor: '#e8f5e9' }}>
                                <CardContent>
                                    <Typography color="text.secondary">Hoàn thành</Typography>
                                    <Typography variant="h5" fontWeight="bold" color="green">{stats.completed}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card sx={{ backgroundColor: '#fff3e0' }}>
                                <CardContent>
                                    <Typography color="text.secondary">Đang làm</Typography>
                                    <Typography variant="h5" fontWeight="bold" color="orange">{stats.inProgress}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ backgroundColor: '#ffebee' }}>
                                <CardContent>
                                    <Typography color="text.secondary">Quá hạn</Typography>
                                    <Typography variant="h5" fontWeight="bold" color="red">{stats.overdue}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Card sx={{ backgroundColor: '#f3e5f5' }}>
                                <CardContent>
                                    <Typography color="text.secondary">Tổng công việc phụ</Typography>
                                    <Typography variant="h5" fontWeight="bold" color="#6a1b9a">{stats.subtasks}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {stats.completed || stats.inProgress || stats.overdue ? (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>Biểu đồ công việc</Typography>
                    <Box maxWidth={400} mx="auto">
                        <Pie
                            data={{
                                labels: ['Hoàn thành', 'Đang làm', 'Quá hạn'],
                                datasets: [{
                                    data: [stats.completed, stats.inProgress, stats.overdue],
                                    backgroundColor: ['#66bb6a', '#ffa726', '#ef5350'],
                                    borderWidth: 1,
                                }],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>
            ) : (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>Không đủ dữ liệu để hiển thị biểu đồ</Typography>
                </Box>
            )}

        </Container>
    );
};

export default ProfilePage;
