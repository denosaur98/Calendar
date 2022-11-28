import React from 'react';
import { isDayContain } from '../helpers/Helpers';
import css from '../day-component/DayComponent.module.css';
const DayComponent = ({events, today, selectedEvent, setEvent}) => {
    const eventList = events.filter(event => isDayContain(event, today));
    return (
        <div className={css.all_forms}>
            <div className={css.form_day}>
                <ul className={css.form_list}>
                    {
                        eventList.map(event => (
                            <li className={css.list_day} onClick={() => setEvent(event)}>
                                {
                                    event.title
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={css.form_out}>
                {
                    selectedEvent ? (
                        <ul className={css.form_list}>
                            <div className={css.list_day}>{selectedEvent.title}</div>
                        </ul>
                    ) : <div className={css.nothing}>Nothing ever</div>
                }
            </div>
        </div>
    )
}
export default DayComponent;