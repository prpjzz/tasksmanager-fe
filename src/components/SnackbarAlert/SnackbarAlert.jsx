import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarAlert = ({ snackbarOpen, onClose, response }) => {
    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={response.status} variant="filled">
                {response.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;