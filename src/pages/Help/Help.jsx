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
                    Đây là trang hướng dẫn sử dụng ứng dụng Quản lý công việc cá nhân. Bạn có thể tìm hiểu cách sử dụng
                    các tính năng chính của ứng dụng thông qua các mục bên dưới.
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
                    <Typography>
                        Ứng dụng Quản lý công việc cá nhân giúp bạn theo dõi và quản lý các công việc, lịch học và lịch
                        trình cá nhân một cách hiệu quả. Với các tính năng như thêm task, phân loại ưu tiên, theo dõi
                        trạng thái và lên lịch học, ứng dụng giúp bạn tối ưu hóa thời gian và nâng cao hiệu suất làm
                        việc.
                    </Typography>
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
                        <Typography component="li">
                            Xem các công việc và lịch học theo dạng lịch tháng, tuần, hoặc ngày
                        </Typography>
                        <Typography component="li">Nhấp vào một công việc để xem chi tiết</Typography>
                        <Typography component="li">
                            Chuyển đổi giữa các chế độ xem khác nhau bằng các nút ở trên cùng của lịch
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <AddTaskIcon />
                        <Typography variant="h6">Thêm Task mới</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Để thêm một công việc mới, bạn cần thực hiện các bước sau:</Typography>
                    <Box component="ol" sx={{ pl: 4 }}>
                        <Typography component="li">Điền thông tin về tên task và mô tả</Typography>
                        <Typography component="li">
                            Chọn trạng thái (Chưa bắt đầu, Đang tiến hành, Đã hoàn thành)
                        </Typography>
                        <Typography component="li">Xác định độ ưu tiên (Thấp, Trung bình, Cao)</Typography>
                        <Typography component="li">Lựa chọn loại task (Task chính hoặc Task phụ)</Typography>
                        <Typography component="li">Nếu chọn Task phụ, bạn cần chọn Task chính tương ứng</Typography>
                        <Typography component="li">Chọn thời gian bắt đầu và kết thúc</Typography>
                        <Typography component="li">Nhấn nút "Thêm Task" để lưu lại</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <PlaylistAddCheckIcon />
                        <Typography variant="h6">Quản lý Task</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Trang Quản lý Task cho phép bạn xem, tìm kiếm, lọc và quản lý tất cả các công việc:
                    </Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                        <Typography component="li">Tìm kiếm task bằng cách nhập từ khóa vào ô tìm kiếm</Typography>
                        <Typography component="li">Lọc task theo trạng thái hoặc độ ưu tiên</Typography>
                        <Typography component="li">
                            Mỗi task được hiển thị dưới dạng thẻ với các thông tin chi tiết
                        </Typography>
                        <Typography component="li">
                            Nhấn vào biểu tượng ba chấm ở góc trên bên phải của mỗi task để sửa hoặc xóa
                        </Typography>
                    </Box>
                    <Typography>
                        Khi chỉnh sửa task, bạn có thể thay đổi tiêu đề, mô tả, trạng thái, mức độ ưu tiên và thời gian
                        deadline.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'primary.light', color: 'white' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <EditCalendarIcon />
                        <Typography variant="h6">Thêm lịch học</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Để thêm lịch học mới, bạn cần:</Typography>
                    <Box component="ol" sx={{ pl: 4 }}>
                        <Typography component="li">Nhập tên môn học</Typography>
                        <Typography component="li">Chọn các ngày học trong tuần</Typography>
                        <Typography component="li">Thiết lập giờ bắt đầu và kết thúc</Typography>
                        <Typography component="li">Chọn tần suất lặp lại (Hàng ngày, Hàng tuần, Một lần)</Typography>
                        <Typography component="li">Nhấn nút "Thêm Lịch Học" để lưu</Typography>
                    </Box>
                    <Typography>
                        Lịch học đã thêm sẽ hiển thị trên trang Tổng quan dưới dạng các sự kiện lặp lại với màu xanh
                        dương.
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
                            Sử dụng tính năng Task chính và Task phụ để tổ chức công việc theo dự án hoặc chủ đề. Điều
                            này giúp bạn dễ dàng theo dõi tiến độ của từng dự án lớn.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Quản lý thời gian
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>
                            Thiết lập độ ưu tiên cho các task để tập trung vào những việc quan trọng. Các task có độ ưu
                            tiên cao nên được xử lý trước.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Theo dõi tiến độ
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography>
                            Cập nhật trạng thái công việc thường xuyên để theo dõi tiến độ và không bỏ sót bất kỳ nhiệm
                            vụ nào.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default Help;
