import React from 'react';
import moment from 'moment';
import { DISPLAY_MODE_DAY } from '../helpers/Config';
import { CellWrapper } from '../styled-components/StyledComponents';
import css from '../calendar-grid/CalendarGrid.module.css';
const CalendarCell = ({dayItem, today, openFormHandler, events, setDisplayMode}) => {
    const isCurrent = day => moment().isSame(day, 'day');
    const isSelectedMonth = day => today.isSame(day, 'month');
    return (
        <>
            <CellWrapper
                    key={dayItem.unix()}
                    className={css.item}
                    isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                    isSelectedMonth={isSelectedMonth(dayItem, today)}
                    onDoubleClick={() => openFormHandler('Create', null, dayItem)}
                    title="Нажмите два раза чтобы добавить"
                >{isCurrent(dayItem) ? (<isCurrent className={css.currentDay}>{dayItem.format('D')}</isCurrent>) : (dayItem.format('D'))}
                    <ul className={css.event} key={dayItem}>
                        {events
                            .slice(0, 2)
                            .map(event => (
                                <li key={event.id}>
                                    <button className={css.ev_btn}
                                            onClick={() => openFormHandler('Update', event)}
                                            title="Нажмите чтобы редактировать">{event.title}
                                    </button>
                                </li>
                            ))
                        }
                        {events.length > 2 ? (<button className={css.ev_btn} key="show more" title="Нажмите чтобы открыть" onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>show more...</button>) : null}
                    </ul>
                </CellWrapper>
        </>
    )
}
export default CalendarCell;