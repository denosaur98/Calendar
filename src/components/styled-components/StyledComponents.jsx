import styled from 'styled-components';
export const CellWrapper = styled.div`n
        background-color: ${props => props.isWeekend ? '#282a2b' : '#1E1F21'};
        height: ${props => props.isHeader ? '40px' : '80px'};
        width: ${props => props.isHeader ? '140px' : '140px'};
        margin-left: ${props => props.isHeader ? '30px' : '30px'};
        border-radius: ${props => props.isHeader ? '3px' : '3px'};
        text-align: ${props => props.isHeader ? 'right' : 'right'};
        padding: ${props => props.isHeader ? '7px' : '10px'};
        color: ${props => props.isSelectedMonth ? '#DDDDDD' : '#555759'};
        font-family: ${props => props.isHeader ? 'Comfortaa300' : 'Comfortaa300'};
        height: fit-content;`;
export const BtnWrapper = styled('button')`
        background-color: ${props => props.unPressed ? '#27282A' : '#565759'};
        border-radius: ${props => props.unPressed ? '5px' : '5px'};`