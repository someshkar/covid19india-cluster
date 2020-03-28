import React from 'react'
import styled from 'styled-components'

const StyledFilterIcon = styled.img`
    width: 40px;
`
const FilterIcon = (props) => <StyledFilterIcon {...props}>{props.children}</StyledFilterIcon>

export default FilterIcon;
