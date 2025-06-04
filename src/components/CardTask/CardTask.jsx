import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CardTask = ({ task }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                borderLeft: `6px solid ${task.status.color}`,
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1,
                    }}
                >
                    {task.task_name}
                </Typography>
                {task.maintask ? (
                    <Typography variant="body2" color="text.secondary">
                        Loại task: Task phụ của task {task.maintask}
                    </Typography>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Loại task: Task chính
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    Start date: {new Date(task.start_date).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    End date: {new Date(task?.extend_date ?? task.end_date).toLocaleString()}
                </Typography>
                {task.completed && (
                    <Typography variant="body2" color="text.secondary">
                        Hoàn thành: {new Date(task.completed_date).toLocaleString()}
                    </Typography>
                )}
                <Box mt={1}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: task.status.color,
                        }}
                    >
                        Trạng thái: {task.status.name}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardTask;
