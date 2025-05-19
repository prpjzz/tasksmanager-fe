import React, { useState } from 'react';
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    IconButton,
    InputAdornment,
    Box,
} from '@mui/material';
import { Visibility, VisibilityOff, PhotoCamera } from '@mui/icons-material';
import * as userService from "../../services/userServices";

const AccountSettings = () => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [name, setName] = useState('Nguyễn Văn A');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);

        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await userService.updateUser({
                name,
                password,
                avatar: avatarFile,
            });
            alert('Thông tin đã được cập nhật!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
                <Typography variant="h5" gutterBottom>
                    Cài đặt tài khoản
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} textAlign="center">
                            {avatarPreview && (
                                <Avatar
                                    src={avatarPreview}
                                    sx={{ width: 100, height: 100, margin: 'auto', border: '2px solid #3f51b5' }}
                                />
                            )}
                            <input
                                accept="image/*"
                                id="upload-avatar"
                                type="file"
                                hidden
                                onChange={handleAvatarChange}
                            />
                            <label htmlFor="upload-avatar">
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Tên người dùng"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Mật khẩu mới"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="Xác nhận mật khẩu"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                sx={{ marginTop: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} textAlign="center">
                            <Button type="submit" variant="contained" color="primary">
                                Lưu thay đổi
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AccountSettings;
