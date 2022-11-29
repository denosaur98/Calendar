import React from 'react';
import GridHeader from '../grid-header/GridHeader';
import DaysList from '../days-list/DaysList';
import css from '../calendar-grid/CalendarGrid.module.css';
const CalendarGrid = ({startDay, today, totalDays, events, openFormHandler, setDisplayMode}) => {
    return(
        <div className={css.items}>
            <GridHeader/>
            <DaysList
                today={today}
                startDay={startDay}
                totalDays={totalDays}
                events={events}
                openFormHandler={openFormHandler}
                setDisplayMode={setDisplayMode}
            />
        </div>
    )
}
export default CalendarGrid;