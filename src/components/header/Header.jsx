import React from 'react';
import { BtnWrapper } from '../styled-components/StyledComponents';
import { DISPLAY_MODE_MONTH, DISPLAY_MODE_DAY} from '../helpers/Config';
import css from '../header/Header.module.css';
const Main = ({today, prevHandler, todayHandler, nextHandler, setDisplayMode, displayMode}) => {
    return(
        <div className={css.main}>
            <a href="/" className={css.home} title="Home">
            <div className={css.title}>
                {
                    displayMode === DISPLAY_MODE_DAY ? (
                        <div className={css.day}>{today.format('DD')}</div>
                    ) : null
                }
                <div>{today.format('MMMM')}&nbsp;</div>
                <div>{today.format('YYYY')}</div>
            </div>
            </a>
            <div className={css.btn_container}>
                <BtnWrapper
                    className={css.btn}
                    unPressed={displayMode === DISPLAY_MODE_MONTH}
                    onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>Month</BtnWrapper>
                <BtnWrapper
                    className={css.btn}
                    unPressed={displayMode === DISPLAY_MODE_DAY}
                    onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>Day</BtnWrapper>
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