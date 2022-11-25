import React from 'react';
import css from '../header/Header.module.css';
const Main = ({today, prevHandler, todayHandler, nextHandler}) => {
    return(
        <div className={css.main}>
            <div className={css.title}>
                <div>{today.format('MMMM')}&nbsp;</div>
                <div>{today.format('YYYY')}</div>
            </div>
            <div className={css.btn_container}>
                <button className={css.btn} onClick={prevHandler}>&#8592;</button>
                <button className={css.btn} onClick={todayHandler}>today</button>
                <button className={css.btn} onClick={nextHandler}>&#8594;</button>
            </div>
        </div>
    );
}
export default Main;