import React from 'react'
import styled from 'styled-components'

const StyledName = styled.div`
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
  `

  const Name = (props) => <StyledName {...props}>{props.children}</StyledName>

export default Name;
