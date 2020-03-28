import React from 'react'
import styled from 'styled-components'

const StyledCellContainer = styled.div`
    font-family: 'Lato', sans-serif;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e7e7e7;
    padding: 15px 20px;
  `

const CellContainer = (props) => <StyledCellContainer {...props}>{props.children}</StyledCellContainer>

export default CellContainer;

