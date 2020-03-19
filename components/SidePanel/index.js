import React from 'react'
import styled from 'styled-components'

const Text = styled.div`
  font-size: 50px;
`

export default function SidePanel() {
  return (
    <div style={{ backgroundColor: 'red' }}>
      <Text>hello</Text>
    </div>
  )
}
