import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`
  display: grid;
  grid-row-gap: 10px;
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
  const CellContainer = styled.div`
    font-family: 'Lato', sans-serif;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e7e7e7;
    padding: 15px 30px;
  `

  const Name = styled.div`
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
  `

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

  return (
    <Container>
      <Cell name="Description">{`${ageEstimate} year-old ${gender}`}</Cell>
      <DoubleCell>
        <Cell name="Gender">{gender}</Cell>
        <Cell name="Age">{ageEstimate}</Cell>
      </DoubleCell>
      <DoubleCell>
        <Cell name="State">{state}</Cell>
        <Cell name="District/City">{city ? city : district}</Cell>
      </DoubleCell>
      <Cell name="Status">{status}</Cell>
      <Cell name="Reported On">{reportedOn}</Cell>
      <Cell name="Notes">{notes}</Cell>
      <Cell name="Sources">
        {sources.map((source, i) => (
          <div>
            <div style={{ display: 'inline-block' }}>{i + 1}.&nbsp;</div>
            <A href={source} target="_blank" rel="noopener noreferer">
              {_.truncate(source, {
                length: 40,
                separator: /,? +/,
              })}
            </A>
          </div>
        ))}
      </Cell>
    </Container>
  )
}
