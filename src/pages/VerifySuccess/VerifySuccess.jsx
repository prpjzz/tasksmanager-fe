import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const VerifySuccess = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 400 }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                    Xác thực thành công!
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Tài khoản của bạn đã được xác thực thành công. Bạn có thể tiếp tục sử dụng dịch vụ.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleGoHome}>
                    Về trang chủ
                </Button>
            </Paper>
        </Box>
    );
};

export default VerifySuccess;
