import * as React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskIcon from '@mui/icons-material/Task';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const Help = () => {
    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                    Hướng dẫn sử dụng
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Đây là trang hướng dẫn sử dụng ứng dụng Quản lý công việc cá nhân. Ứng dụng cung cấp các tính năng
                    giúp bạn quản lý công việc, lịch học và tiến độ cá nhân hiệu quả hơn. Xem chi tiết các mục bên dưới
                    để nắm rõ cách sử dụng.
                </Typography>
            </Paper>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TaskIcon />
                        <Typography variant="h6">Tổng quan</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Ứng dụng giúp bạn:</Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                        <Typography component="li">Quản lý công việc cá nhân, lịch học, lịch trình</Typography>
                        <Typography component="li">Thêm, sửa, xóa, tìm kiếm và lọc task</Typography>
                        <Typography component="li">Phân loại task chính/phụ, trạng thái, độ ưu tiên</Typography>
                        <Typography component="li">Theo dõi tiến độ, deadline, và lịch học lặp lại</Typography>
                        <Typography component="li">Giao diện trực quan, dễ sử dụng</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <CalendarMonthIcon />
                        <Typography variant="h6">Trang Tổng quan (Home)</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Trang Tổng quan hiển thị lịch và các công việc sắp tới của bạn. Bạn có thể:</Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                        <Typography component="li">Xem công việc, lịch học theo dạng lịch tháng, tuần, ngày</Typography>
                        <Typography component="li">Nhấp vào task/lịch để xem chi tiết hoặc chỉnh sửa</Typography>
                        <Typography component="li">Chuyển đổi giữa các chế độ xem bằng các nút trên lịch</Typography>
                        <Typography component="li">Các sự kiện lặp lại (lịch học) sẽ hiển thị nổi bật</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <AddTaskIcon />
                        <Typography variant="h6">Thêm & Sửa Task</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Để thêm hoặc chỉnh sửa một công việc, bạn cần:</Typography>
                    <Box component="ol" sx={{ pl: 4 }}>
                        <Typography component="li">Nhập tên và mô tả task</Typography>
                        <Typography component="li">
                            Chọn trạng thái (Chưa bắt đầu, Đang tiến hành, Đã hoàn thành)
                        </Typography>
                        <Typography component="li">Chọn độ ưu tiên (Thấp, Trung bình, Cao)</Typography>
                        <Typography component="li">Chọn loại task (Task chính hoặc Task phụ)</Typography>
                        <Typography component="li">Nếu là Task phụ, chọn Task chính liên quan</Typography>
                        <Typography component="li">Chọn thời gian bắt đầu, kết thúc, deadline</Typography>
                        <Typography component="li">Nhấn "Thêm Task" hoặc "Lưu thay đổi"</Typography>
                    </Box>
                    <Typography sx={{ mt: 2 }}>
                        Bạn có thể chỉnh sửa hoặc xóa task bất kỳ bằng cách nhấn vào biểu tượng ba chấm trên thẻ task
                        trong trang Tasks. Bạn cũng có thể theo dõi trong trang Home, các tasks trên trang Home hiển thị
                        với màu xanh dương để phân biệt với lịch học.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <PlaylistAddCheckIcon />
                        <Typography variant="h6">Quản lý & Lọc Task</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Trang Quản lý Task cho phép bạn:</Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                        <Typography component="li">Tìm kiếm task theo từ khóa</Typography>
                        <Typography component="li">Lọc task theo trạng thái, độ ưu tiên, loại task</Typography>
                        <Typography component="li">Sắp xếp task theo deadline, mức độ ưu tiên</Typography>
                        <Typography component="li">Xem chi tiết, chỉnh sửa, xóa task</Typography>
                    </Box>
                    <Typography sx={{ mt: 2 }}>
                        Khi chỉnh sửa, bạn có thể cập nhật 1 vài thông tin như tên, mô tả, trạng thái, độ ưu tiên,
                        deadline của task
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <EditCalendarIcon />
                        <Typography variant="h6">Thêm & Quản lý Lịch học</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Để thêm lịch học mới:</Typography>
                    <Box component="ol" sx={{ pl: 4 }}>
                        <Typography component="li">Nhập tên môn học</Typography>
                        <Typography component="li">Chọn ngày học trong tuần</Typography>
                        <Typography component="li">Thiết lập giờ bắt đầu, kết thúc</Typography>
                        <Typography component="li">Chọn tần suất lặp lại (Hàng ngày, Hàng tuần, Một lần)</Typography>
                        <Typography component="li">Nhấn "Thêm Lịch Học" để lưu</Typography>
                    </Box>
                    <Typography sx={{ mt: 2 }}>
                        Lịch học sẽ hiển thị trên trang Home, Schedules dưới dạng sự kiện lặp lại. Bạn có thể chỉnh sửa
                        hoặc xóa lịch học bất kỳ. Đối với trang Home lịch học hiển thị với màu xanh lá cây để phân biệt
                        với các task khác.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TaskIcon />
                        <Typography variant="h6">Mẹo sử dụng hiệu quả</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Tổ chức công việc
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>
                            Sử dụng Task chính/phụ để nhóm công việc theo dự án hoặc chủ đề. Điều này giúp bạn dễ dàng
                            theo dõi tiến độ từng dự án.
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Quản lý thời gian
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>
                            Ưu tiên các task quan trọng, sử dụng bộ lọc để tập trung vào những việc cần làm trước.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Theo dõi tiến độ
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>Cập nhật trạng thái task thường xuyên để không bỏ sót công việc nào.</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default Help;
