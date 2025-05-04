import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
import TaskDetail from '../../components/TaskDetail';
import * as taskServices from '../../services/taskServices';
import { useAuth } from '../../hooks/auth';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

const Home = () => {
    const [tasks, setTasks] = useState(null); // State to manage tasks
    const [taskDetail, setTaskDetail] = useState(null);
    const [open, setOpen] = useState(false); // State to manage the open/close state of the task detail dialog
    const [loading, setLoading] = useState(true); // State to manage loading state
    const { user } = useAuth();
    console.log('User ID:', user.id); // Log the user ID to check if it's being passed correctly

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await taskServices.getTasksByUserId(user.id);
                console.log('Fetched tasks:', response);
                setTasks(response);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching tasks
            }
        }

        fetchTasks(); // Call the function to fetch tasks    
    }, [user.id]); // Update dependency array to include user.id

    if (loading) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    const handleGenerateEvents = (tasks) => {
        return tasks ? tasks.flatMap((task) => ({
            id: task.id,
            group: `task-${task.id}`,
            title: task.task_name,
            start: task.start_date,
            end: task?.extend_date || task.end_date,
            description: task.task_description,
            status: task.status,
            priority: task.priority,
            subtasks: task.subtasks,
            extendedProps: {
                taskId: task.id,
                extend_date: task?.extend_date || null,
                isExtension: false
            }
        })) : [];
    }

    const handleViewDetails = (info) => {
        setTaskDetail({
            title: info.event.title,
            description: info.event.extendedProps.description,
            status: info.event.extendedProps.status,
            priority: info.event.extendedProps.priority,
            subtasks: info.event.extendedProps.subtasks,
            start: info.event.start ? info.event.start.toISOString() : null,
            end: info.event.end ? info.event.end.toISOString() : null,
            extend_date: info.event.extendedProps?.extend_date || null,
        });
        setOpen(true); // Open the task detail dialog
    }

    const handleCloseDetails = () => {
        setTaskDetail(null);
        setOpen(false); // Close the task detail dialog
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: 'background.paper',
            }}
        >
            <div
                style={{
                    flex: 1,
                    width: '100%',
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay',
                    }}
                    editable={true}
                    droppable={true}
                    events={handleGenerateEvents(tasks)}
                    eventClick={(info) => {
                        // Handle event click here
                        console.log('Clicked event:', info);
                        handleViewDetails(info);
                    }}
                    height="auto"
                />
            </div>

            {taskDetail !== null && (
                <TaskDetail
                    open={open} // Pass the open state to TaskDetail
                    task={taskDetail}
                    onClose={handleCloseDetails} // Pass the close handler to TaskDetail
                />
            )}
        </Box>
    );
}

export default Home;