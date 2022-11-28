import React from 'react';
import CalendarCell from '../ClendarCell/CalendarCell';
import { isDayContain } from '../helpers/Helpers';
const DaysList = ({startDay, totalDays, events, openFormHandler, today}) => {
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    return (
            daysArray.map((dayItem) => (
                <CalendarCell
                    dayItem={dayItem}
                    today={today}
                    events={events.filter(event => isDayContain(event, dayItem))}
                    openFormHandler={openFormHandler}/>
            ))
    )
}
export default DaysList;