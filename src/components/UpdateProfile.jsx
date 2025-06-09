import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/profileService';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          password: '', // Không lấy password từ server để bảo mật
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      // Làm mới dữ liệu sau khi cập nhật
      const updatedProfile = await getProfile();
      setFormData({
        ...updatedProfile,
        password: '', // Reset password field
      });
      navigate('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) return <Typography>Đang tải...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cập nhật thông tin cá nhân
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Họ tên"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Mật khẩu mới (để trống nếu không đổi)"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Cập nhật
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfile;