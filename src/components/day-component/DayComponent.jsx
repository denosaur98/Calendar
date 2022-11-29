import React from 'react';
import { isDayContain } from '../helpers/Helpers';
import css from '../day-component/DayComponent.module.css';
import '../../App.css';
const DayComponent = ({events, today, selectedEvent, changeEventHandler, eventFetchHandler, method, removeBtnHandler, cancelBtnHandler, openFormHandler}) => {
    const eventList = events.filter(event => isDayContain(event, today));
    return (
        <div className={css.all_forms}>
            <div className={css.form_day}>
                <ul className={css.form_list}>
                    {
                        eventList.map(event => (
                            <li className={css.list_day} onClick={() => openFormHandler('Update', event)}>
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
                            <input
                                className={css.title_day_out}
                                value={selectedEvent.title}
                                placeholder="Add title"
                                onChange={e => changeEventHandler(e.target.value, 'title')}
                                />
                            <textarea
                                className={css.body_day_out}
                                value={selectedEvent.description}
                                placeholder="Add description"
                                onChange={e => changeEventHandler(e.target.value, 'description')}
                                />
                            <div className={css.buttons_day_wrapper}>
                                <button className={css.buttons_day_out} onClick={eventFetchHandler}>{method}</button>
                                {
                                method === 'Update' ? (
                                    <button className={css.buttons_day_out} onClick={removeBtnHandler}>Remove</button>
                                ) : null
                                }
                                <button className={css.buttons_day_out} onClick={cancelBtnHandler}>Cancel</button>
                            </div>
                        </ul>
                    ) : (<>
                            <div className={css.display_noth}>
                                <div className={css.nothing}>Nothing ever</div>
                                <button className={css.btn_day_out_create} onClick={() => openFormHandler('Create', null, today)}>Create</button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
export default DayComponent;