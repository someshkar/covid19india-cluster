import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import CellContainer from './CellContainer';
import Name from './Name';

const Container = styled.div`
  font-size: 16px;
  display: grid;
  grid-row-gap: 10px;
  overflow: auto;
`

const DoubleCell = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`

const A = styled.a`
  display: inline-block;
  padding-bottom: 10px;
`

function Cell({ name, children }) {
  return (
    <CellContainer>
      <Name>{name}</Name>
      <div>{children}</div>
    </CellContainer>
  )
}

export default function DataGrid(patient) {
  const {
    notes,
    gender,
    ageEstimate,
    state,
    city,
    district,
    status,
    reportedOn,
    sources,
  } = patient

  const genderInitCap = gender.charAt(0).toUpperCase() + gender.slice(1)

  return (
    <Container>
      <DoubleCell>
        <Cell name="Gender">{gender ? genderInitCap : '-'}</Cell>
        <Cell name="Age">{ageEstimate ? ageEstimate : '-'}</Cell>
      </DoubleCell>
      <DoubleCell>
        <Cell name="State">{state ? state : '-'}</Cell>
        <Cell name="District/City">{city ? city : district}</Cell>
      </DoubleCell>
      <Cell name="Status">{status}</Cell>
      <Cell name="Reported On">{reportedOn}</Cell>
      <Cell name="Notes">{notes}</Cell>
      <Cell name="Sources">
        {sources
          ? sources.map((source, i) => (
              <div key={i}>
                <div style={{ display: 'inline-block' }} key={i}>
                  {i + 1}.&nbsp;
                </div>
                <A
                  href={source}
                  target="_blank"
                  rel="noopener noreferer"
                  key={`link_${i}`}
                >
                  {_.truncate(source, {
                    length: 40,
                    separator: /,? +/,
                  })}
                </A>
              </div>
            ))
          : null}
      </Cell>
    </Container>
  )
}
