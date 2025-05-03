import { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CardTask = ({ task }) => {
    const [statusColors, setStatusColors] = useState({});
    
    useEffect(() => {
        const fetchStatusColors = async () => {
            // const response = await fetch('/api/statusColors');
            // const data = await response.json();
            // Fake data for demonstration purposes
            const data = {
                "Not Started": "#f44336",
                "In Progress": "#ff9800",
                "Completed": "#4caf50",
                "On Hold": "#2196f3",
                "Cancelled": "#9e9e9e",
            };
            setStatusColors(data);
        }

        fetchStatusColors();
    }, []);

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                borderLeft: `6px solid ${statusColors[task.status] ||
                    "#ccc"
                    }`,
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        mb: 1,
                    }}
                >
                    {task.task_name}
                </Typography>
                {task.maintask ? (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Loại task: Task phụ của task {task.maintask}
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Loại task: Task chính
                    </Typography>
                )}
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Start date: {new Date(task.start_date).toLocaleString()}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    End date: {new Date(task.end_date).toLocaleString()}
                </Typography>
                <Box mt={1}>
                    <Typography
                        variant="caption"
                        sx={{
                            color:
                                statusColors[
                                task.status
                                ] || "#999",
                        }}
                    >
                        Trạng thái: {task.status}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CardTask;