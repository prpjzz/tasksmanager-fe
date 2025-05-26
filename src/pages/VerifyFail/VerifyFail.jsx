import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const VerifyFail = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor="background.paper"
                p={4}
                borderRadius={2}
                boxShadow={3}
            >
                <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h5" color="error" gutterBottom>
                    Xác thực thất bại
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" mb={3}>
                    Đã xảy ra lỗi trong quá trình xác thực. Vui lòng kiểm tra lại liên kết hoặc thử lại sau.
                </Typography>
                <Button variant="contained" color="primary" href="/">
                    Quay về trang chủ
                </Button>
            </Box>
        </Container>
    );
};

export default VerifyFail;
