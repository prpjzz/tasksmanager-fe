import * as React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Stack, Divider, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GroupIcon from '@mui/icons-material/Group';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const teamMembers = [
    {
        name: 'Phan Đình Phú',
        role: 'Frontend Developer',
        email: 'phuphandinh2004@email.com',
        avatar: '',
    },
    {
        name: 'Trần Thị B',
        role: 'Backend Developer',
        email: 'tranthib@email.com',
        avatar: '',
    },
    // Thêm thành viên khác nếu cần
];

export default function About() {
    return (
        <Box sx={{ mx: 'auto', mt: 6, mb: 6, p: 2 }}>
            <Card elevation={3}>
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                        <InfoOutlinedIcon color="primary" fontSize="large" />
                        <Typography variant="h4" fontWeight={700}>
                            Giới thiệu về ứng dụng Quản lý công việc cá nhân
                        </Typography>
                    </Stack>
                    <Typography variant="body1" mb={2}>
                        Ứng dụng <b>Quản lý công việc cá nhân</b> giúp bạn dễ dàng tạo, theo dõi, chỉnh sửa và hoàn thành các công việc hàng ngày. Bạn có thể phân loại công việc theo mức độ ưu tiên, trạng thái, tạo công việc con, lên lịch học, và nhận thông báo nhắc nhở.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <AssignmentTurnedInIcon color="success" />
                        <Typography variant="h6" fontWeight={600}>
                            Tính năng nổi bật
                        </Typography>
                    </Stack>
                    <List dense>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Quản lý task chính và task phụ" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Lên lịch học, nhắc nhở công việc" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Phân loại theo trạng thái, độ ưu tiên" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Giao diện trực quan, dễ sử dụng" />
                        </ListItem>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <GroupIcon color="info" />
                        <Typography variant="h6" fontWeight={600}>
                            Thành viên phát triển
                        </Typography>
                    </Stack>
                    <List>
                        {teamMembers.map((member, idx) => (
                            <ListItem key={idx}>
                                <ListItemIcon>
                                    <Avatar src={member.avatar}>{member.name[0]}</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={member.name}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {member.role}
                                            </Typography>
                                            <br />
                                            <Link href={`mailto:${member.email}`} underline="hover">
                                                <EmailIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                                                {member.email}
                                            </Link>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <GitHubIcon />
                        <Typography variant="body2">
                            Mã nguồn:&nbsp;
                            <Link href="https://github.com/phandinhphu/tasksmanager-fe" target="_blank" rel="noopener">
                                github.com/phandinhphu/tasksmanager-fe
                            </Link>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}