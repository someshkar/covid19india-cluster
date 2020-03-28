import React from 'react'
import styled from 'styled-components'

const StyledFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: '20vh';
    user-select: none;
    background-color: ${props => (props.selected ? '#d6d6d6' : '#F2F2F2')};
    transition: all 0.2s ease-out;
    cursor: pointer;
    &:hover {
      background-color: #d7d7d7;
    }
  `
const FilterContainer = (props) => <StyledFilterContainer {...props}>{props.children}</StyledFilterContainer>

export default FilterContainer;

