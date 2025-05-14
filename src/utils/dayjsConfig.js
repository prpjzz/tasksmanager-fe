import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeVi from 'dayjs/locale/vi';

// Extend plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

// Set default locale and timezone
dayjs.locale(localeVi);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

export default dayjs;
