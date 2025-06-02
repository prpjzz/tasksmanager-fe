import React, { useState } from 'react';
import { useAuth } from '../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button } from '@mui/material';

const UserAccountSettingsPage = () => {
  const { user, updateUser, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordData, setPasswordData] = useState({ current: '', new: '' });
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    try {
      await updateUser(formData);
      alert('Cập nhật thông tin thành công!');
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!passwordData.current || !passwordData.new) {
      setError('Vui lòng điền đầy đủ mật khẩu!');
      return;
    }
    try {
      await updatePassword(passwordData.current, passwordData.new);
      alert('Đổi mật khẩu thành công!');
      setPasswordData({ current: '', new: '' });
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) return <Typography>Vui lòng đăng nhập!</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Thay Đổi Thông Tin
      </Typography>
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      <Box component="form" onSubmit={handleUpdateProfile} sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 1, mb: 4 }}>
        <TextField
          label="Tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Lưu thông tin
        </Button>
      </Box>
      <Box component="form" onSubmit={handleUpdatePassword} sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 1 }}>
        <TextField
          label="Mật khẩu hiện tại"
          type="password"
          value={passwordData.current}
          onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Mật khẩu mới"
          type="password"
          value={passwordData.new}
          onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Đổi mật khẩu
        </Button>
      </Box>
    </Box>
  );
};

export default UserAccountSettingsPage;