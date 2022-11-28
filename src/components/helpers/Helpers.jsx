import moment from 'moment/moment';
export const isCurrent = day => moment().isSame(day, 'day');
export const isSelectedMonth = (day, today) => today.isSame(day, 'month');
export const isDayContain = (event, dayItem) => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X');