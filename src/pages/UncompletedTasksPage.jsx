import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import TaskList from '../components/TaskList';

const UncompletedTasksPage = () => {
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Task Chưa Hoàn Thành
        </Typography>
        <TaskList />
      </Box>
    </Layout>
  );
};

export default UncompletedTasksPage;