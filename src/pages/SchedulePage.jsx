import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import ScheduleList from '../components/ScheduleList';

const SchedulePage = () => {
  // Giả định userId (thay bằng logic thực tế nếu có)
  const userId = 1;

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Lịch học
        </Typography>
        <ScheduleList userId={userId} />
      </Box>
    </Layout>
  );
};

export default SchedulePage;