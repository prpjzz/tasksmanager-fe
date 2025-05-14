import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SideMenu from "../../components/SideMenu";
import TaskNotification from "../../components/TaskNotification";
import { useAuth } from "../../hooks/auth";

const DefaultLayout = ({ children }) => {
    const { user } = useAuth();

    return (
        <Box sx={{ display: "flex" }}>
            {/* Task notifications */}
            <TaskNotification userId={user.id} />

            {/* Side menu */}
            <SideMenu />

            {/* Main content */}
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: "auto",
                })}
            >
                <Stack
                    spacing={2}
                    sx={{
                        mx: 3,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    {children}
                </Stack>
            </Box>
        </Box>
    );
};

export default DefaultLayout;
