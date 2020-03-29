import React from 'react'
import styled from 'styled-components'

const StyledFilterHeader = styled.div`
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;

    @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    }
`

const FilterHeader = (props) => <StyledFilterHeader {...props}>{props.children}</StyledFilterHeader>

export default FilterHeader;

