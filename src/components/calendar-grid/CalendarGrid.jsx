import React from 'react';
import moment from 'moment/moment';
import styled from 'styled-components';
import css from '../calendar-grid/CalendarGrid.module.css';
const CalendarGrid = ({startDay, today, totalDays, events, openFormHandler}) => {
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    const CellWrapper = styled.div`
        background-color: ${props => props.isWeekend ? '#282a2b' : '#1E1F21'};
        height: ${props => props.isHeader ? '40px' : '80px'};
        width: ${props => props.isHeader ? '140px' : '140px'};
        margin-left: ${props => props.isHeader ? '30px' : '30px'};
        border-radius: ${props => props.isHeader ? '3px' : '3px'};
        text-align: ${props => props.isHeader ? 'right' : 'right'};
        padding: ${props => props.isHeader ? '7px' : '10px'};
        color: ${props => props.isSelectedMonth ? '#DDDDDD' : '#555759'};
        height: fit-content;`
    const isCurrent = day => moment().isSame(day, 'day');
    const isSelectedMonth = day => today.isSame(day, 'month');
    return(
        <div className={css.items}>
        {[...Array(7)].map((_,i) => (
            <CellWrapper isHeader isSelectedMonth key={i}>
                {moment().day(i + 1).format('ddd')}
            </CellWrapper>
        ))}
        {daysArray.map((dayItem) => (
            <CellWrapper
                key={dayItem.unix()}
                className={css.item}
                isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                isSelectedMonth={isSelectedMonth(dayItem)}
                onDoubleClick={() => openFormHandler('Create', null, dayItem)}
                title="Нажмите два раза чтобы добавить"
            >{isCurrent(dayItem) ? (<isCurrent className={css.currentDay}>{dayItem.format('D')}</isCurrent>) : (dayItem.format('D'))}
                <ul className={css.event} key={dayItem}>
                    {events
                        .slice(0, 2)
                        .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                        .map(event => (
                            <li key={event.id}>
                                <button className={css.ev_btn}
                                        onClick={() => openFormHandler('Update', event)}
                                        title="Нажмите чтобы редактировать">{event.title}</button>
                            </li>
                        ))
                    }
                    {/* {events.length > 2 ? (<div className={css.ev_btn} key="show more">show more...</div>) : null} */}
                </ul>
            </CellWrapper>
        ))}
        </div>
    );
}
export default CalendarGrid;