import React, { useState, useMemo } from 'react';
import { useTasks, useDeleteTask } from '../hooks/task';
import { useAuth } from '../hooks/auth';
import TaskCardWrapper from '../Task/TaskCardWrapper/TaskCardWrapper';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box,
} from '@mui/material';

const UncompletedTasksPage = () => {
  const { user } = useAuth();
  const { data: tasks = [], isLoading, error } = useTasks();
  const deleteTask = useDeleteTask();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  // Xử lý xóa task
  const handleDelete = (task) => {
    deleteTask.mutate(task.id);
  };

 
  const handleEdit = (taskId, updatedData) => {
  
  };

  // Lọc các task chưa hoàn thành (status không phải "Completed")
  const uncompletedTasks = useMemo(() => {
    return tasks.filter(task => {
      const status = task.status || 1; // Mặc định là "To Do" nếu không có status
      return status !== 3; // 3 là "Completed"
    });
  }, [tasks]);

  // Lọc theo tìm kiếm và độ ưu tiên
  const filteredTasks = useMemo(() => {
    return uncompletedTasks
      .filter(task => task.task_name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(task => !filterPriority || task.priority.toString() === filterPriority);
  }, [uncompletedTasks, searchTerm, filterPriority]);

  // Xử lý trạng thái tải và lỗi
  if (!user) return <Typography>Vui lòng đăng nhập!</Typography>;
  if (isLoading) return <Typography>Đang tải...</Typography>;
  if (error) return <Typography color="error">Lỗi: {error.message}</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Task Chưa Hoàn Thành
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tìm kiếm task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Độ ưu tiên"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="1">Low</MenuItem>
            <MenuItem value="2">Medium</MenuItem>
            <MenuItem value="3">High</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      {filteredTasks.length === 0 ? (
        <Typography>Không có task chưa hoàn thành.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredTasks.map(task => (
            <Grid item key={task.id} xs={12} sm={6} md={4}>
              <TaskCardWrapper
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UncompletedTasksPage;