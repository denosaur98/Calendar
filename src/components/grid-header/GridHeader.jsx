import React from 'react';
import moment from 'moment/moment';
import { CellWrapper } from '../styled-components/StyledComponents';
const GridHeader = () => {
    return (
        <>
            {[...Array(7)].map((_,i) => (
                <CellWrapper isHeader isSelectedMonth key={i}>
                    {moment().day(i + 1).format('ddd')}
                </CellWrapper>
            ))}
        </>
    )
}
export default GridHeader;