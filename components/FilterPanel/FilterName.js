import React from 'react'
import styled from 'styled-components'

const StyledFilterName = styled.div`
    text-transform: uppercase;
    font-size: 11px;
`
const FilterName = (props) => <StyledFilterName {...props}>{props.children}</StyledFilterName>

export default FilterName;
