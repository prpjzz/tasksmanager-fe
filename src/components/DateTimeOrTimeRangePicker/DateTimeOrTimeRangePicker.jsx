import * as React from 'react';
import { LocalizationProvider, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import vi from 'date-fns/locale/vi';

const DateTimeOrTimeRangePicker = ({ value, mainTask, onChange }) => {
    console.log('DateTimeOrTimeRangePicker render');
    console.log(value);
    const [pickerType, setPickerType] = React.useState('dateTime'); // 'dateTime' or 'timeRange'
    const [start, setStart] = React.useState(value?.start || new Date());
    const [end, setEnd] = React.useState(value?.end || new Date());
    const [dateError, setDateError] = React.useState('');

    React.useEffect(() => {
        if (onChange) {
            onChange({ start, end, pickerType });
        }
    }, [start, end, pickerType, onChange]);

    React.useEffect(() => {
        if (value) {
            setStart(value.start || new Date());
            setEnd(value.end || new Date());
            setPickerType(value.pickerType || 'dateTime');
        }
    }, [value])

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

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                {pickerType === 'dateTime' ? (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <DateTimePicker
                            label="Ngày giờ bắt đầu"
                            value={start}
                            onChange={(newValue) => setStart(newValue)}
                            onError={(reason) => setDateError(reason)}
                            minDateTime={start}
                            {...((mainTask && mainTask !== '') ? { maxDateTime: value.end } : {})}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            slotProps={{
                                textField: {
                                    margin: "dense",
                                    fullWidth: true,
                                    error: !!dateError,
                                    helperText: dateError ? "Ngày không hợp lệ" : "",
                                }
                            }}
                        />
                        <DateTimePicker
                            label="Ngày giờ kết thúc"
                            value={end}
                            onChange={(newValue) => setEnd(newValue)}
                            onError={(reason) => setDateError(reason)}
                            minDateTime={start}
                            {...((mainTask && mainTask !== '') ? { maxDateTime: value.end } : {})}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            slotProps={{
                                textField: {
                                    margin: "dense",
                                    fullWidth: true,
                                    error: !!dateError,
                                    helperText: dateError ? "Ngày không hợp lệ" : "",
                                }
                            }}
                        />
                    </Box>
                ) : (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TimePicker
                            label="Giờ bắt đầu"
                            value={start}
                            onChange={(newValue) => setStart(newValue)}
                            onError={(reason) => setDateError(reason)}
                            minTime={start}
                            {...((mainTask && mainTask !== '') ? { maxDateTime: value.end } : {})}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            slotProps={{
                                textField: {
                                    margin: "dense",
                                    fullWidth: true,
                                    error: !!dateError,
                                    helperText: dateError ? "Giờ không hợp lệ" : "",
                                }
                            }}
                        />
                        <TimePicker
                            label="Giờ kết thúc"
                            value={end}
                            onChange={(newValue) => setEnd(newValue)}
                            onError={(reason) => setDateError(reason)}
                            minTime={start}
                            {...((mainTask && mainTask !== '') ? { maxDateTime: value.end } : {})}
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            slotProps={{
                                textField: {
                                    margin: "dense",
                                    fullWidth: true,
                                    error: !!dateError,
                                    helperText: dateError ? "Giờ không hợp lệ" : "",
                                }
                            }}
                        />
                    </Box>
                )}
            </LocalizationProvider>
        </Box>
    );
}

export default React.memo(DateTimeOrTimeRangePicker);