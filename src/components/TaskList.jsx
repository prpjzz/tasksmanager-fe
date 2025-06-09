import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Button } from '@mui/material';
import { getUncompletedTasks, searchTasks, filterTasksByPriority, deleteTask } from '../services/taskServices';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getUncompletedTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    try {
      const data = await searchTasks(e.target.value);
      setTasks(data);
    } catch (error) {
      console.error('Failed to search tasks:', error);
    }
  };

  const handleFilter = async (e) => {
    setPriorityFilter(e.target.value);
    try {
      const data = await filterTasksByPriority(e.target.value);
      setTasks(data);
    } catch (error) {
      console.error('Failed to filter tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Task chưa hoàn thành
      </Typography>
      <TextField
        label="Tìm kiếm task"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Select
        value={priorityFilter}
        onChange={handleFilter}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Tất cả độ ưu tiên</MenuItem>
        <MenuItem value="high">Cao</MenuItem>
        <MenuItem value="medium">Trung bình</MenuItem>
        <MenuItem value="low">Thấp</MenuItem>
      </Select>
      {tasks.length === 0 ? (
        <Typography>Không có task nào chưa hoàn thành</Typography>
      ) : (
        tasks.map((task) => (
          <Box key={task.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="body1">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Độ ưu tiên: {task.priority}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(task.id)}
              sx={{ mt: 1 }}
            >
              Xóa
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default TaskList;