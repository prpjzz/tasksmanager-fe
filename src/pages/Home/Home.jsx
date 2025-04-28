import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
import TaskDetail from '../../components/TaskDetail';
import * as taskServices from '../../services/taskServices'; // Import task service

const Home = () => {
    const [tasks, setTasks] = useState(null); // State to manage tasks
    const [taskDetail, setTaskDetail] = useState(null);
    const [open, setOpen] = useState(false); // State to manage the open/close state of the task detail dialog

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await taskServices.getAllTasks();
                console.log('Fetched tasks:', response.data);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks(); // Call the function to fetch tasks    
    }, []); // Empty dependency array to run once on component mount

    const handleGenerateEvents = (tasks) => {
        return tasks ? tasks.map((task) => ({
            id: task.id,
            title: task.task_name,
            start: task.start_date,
            end: task.end_date,
            description: task.task_description,
            status: task.status,
            priority: task.priority,
            subtasks: task.subtasks,
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
                    editable={true}         // Cho phép kéo thả trong calendar
                    droppable={true}        // Cho phép kéo thả từ bên ngoài vào calendar
                    events={handleGenerateEvents(tasks)} // Pass the generated events to FullCalendar
                    drop={(info) => {
                        // Handle drop event here
                        console.log('Dropped event:', info);
                    }}
                    eventClick={(info) => {
                        // Handle event click here
                        console.log('Clicked event:', info);
                        handleViewDetails(info);
                    }}
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