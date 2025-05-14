import { useEffect } from "react";
import { toast } from "react-toastify";
import socket from "../../utils/socket";

function TaskReminderListener({ userId }) {
    useEffect(() => {
        if (!userId) return;

        // Gửi userId lên server sau khi đăng nhập
        socket.emit("register", userId);

        // Lắng nghe sự kiện từ server
        socket.on("notification", (data) => {
            console.log("Notification received:", data);
            const formattedDate = new Date(data.endDate).toLocaleDateString();
            toast.info(
                `🔔 Task "${data.taskName}" của bạn sắp hết hạn vào ${formattedDate}`,
                {
                    position: "top-right",
                    autoClose: 5000,
                }
            );
        });

        // Dọn dẹp khi unmount
        return () => {
            socket.off("notification");
        };
    }, [userId]);

    return null; // Component không hiển thị gì
}

export default TaskReminderListener;
