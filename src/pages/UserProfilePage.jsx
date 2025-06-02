import React from 'react';
import { useAuth } from '../hooks/auth';
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const UserProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return <Typography>Vui lòng đăng nhập!</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Hồ Sơ Người Dùng
      </Typography>
      <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="body1"><strong>Tên:</strong> {user.name}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}><strong>Email:</strong> {user.email}</Typography>
        <Link to="/profile/edit">
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Thay đổi thông tin
          </Button>
        </Link>
        <Button variant="contained" color="error" onClick={logout}>
          Đăng xuất
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfilePage;