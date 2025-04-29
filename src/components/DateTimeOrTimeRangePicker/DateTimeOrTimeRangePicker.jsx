import * as React from 'react';
import { LocalizationProvider, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';

const DateTimeOrTimeRangePicker = ({ value, onChange }) => {
    console.log('DateTimeOrTimeRangePicker render');

    const [pickerType, setPickerType] = React.useState('dateTime'); // 'dateTime' or 'timeRange'
    const now = new Date();
    const [start, setStart] = React.useState(value?.start || now);
    const [end, setEnd] = React.useState(value?.end || now);
    
    React.useEffect(() => {
      if (onChange) {
        onChange({ start, end, pickerType });
      }
    }, [start, end, pickerType, onChange]);
  
    const handlePickerTypeChange = (event) => {
        setPickerType(event.target.value);
    };

    return (
        <Box>
            <RadioGroup
                row
                value={pickerType}
                onChange={handlePickerTypeChange}
                sx={{ mb: 2 }}
            >
                <FormControlLabel value="dateTime" control={<Radio />} label="Chọn ngày giờ" />
                <FormControlLabel value="timeRange" control={<Radio />} label="Chọn khoảng thời gian" />
            </RadioGroup>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {pickerType === 'dateTime' ? (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <DateTimePicker
                            label="Ngày giờ bắt đầu"
                            value={start}
                            onChange={(newValue) => setStart(newValue)}
                            minDateTime={now}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                        />
                        <DateTimePicker
                            label="Ngày giờ kết thúc"
                            value={end}
                            onChange={(newValue) => setEnd(newValue)}
                            minDateTime={start}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                        />
                    </Box>
                ) : (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TimePicker
                            label="Giờ bắt đầu"
                            value={start}
                            onChange={(newValue) => setStart(newValue)}
                            minTime={now}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                        />
                        <TimePicker
                            label="Giờ kết thúc"
                            value={end}
                            onChange={(newValue) => setEnd(newValue)}
                            minTime={start}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                        />
                    </Box>
                )}
            </LocalizationProvider>
        </Box>
    );
}

export default React.memo(DateTimeOrTimeRangePicker);