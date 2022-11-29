import React from 'react';
import CalendarCell from '../calendar-cell/CalendarCell';
import { isDayContain } from '../helpers/Helpers';
const DaysList = ({startDay, totalDays, events, openFormHandler, today, setDisplayMode}) => {
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    return (
            daysArray.map((dayItem) => (
                <CalendarCell
                    dayItem={dayItem}
                    today={today}
                    events={events.filter(event => isDayContain(event, dayItem))}
                    openFormHandler={openFormHandler}
                    setDisplayMode={setDisplayMode}
                />
            ))
    )
}
export default DaysList;