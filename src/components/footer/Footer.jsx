import React from 'react';
import css from '../footer/Footer.module.css';
const Footer = () => {
    return(
        <div className={css.footer}>
            Calendar by&nbsp;<a className={css.a} href='https://github.com/denosaur98' target='_blank' rel='noreferrer'>denosaur98</a><strong>,</strong>&nbsp;2022
        </div>
    );
}
export default Footer;