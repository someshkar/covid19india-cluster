import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getIcon } from '../../util/parse'
import { SearchInput } from '../UI/search-input'
import { setSearchTerm } from '../Redux/actions'

const Container = styled.div`
  font-family: 'Lato', sans-serif;
  user-select: none;
`

const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14 px;
  color: #858383;
`

const Dot = styled.div`
  color: #eb5757;
  font-size: 28px;
  transform: translateY(3px);
  display: inline-block;
  font-weight: bold;
`

const PatientContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  height: 10vh;
  padding: 15px;
  padding-left: 0;
  user-select: text;
`

const Image = styled.img`
  height: 90%;
`

const Name = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
`

function Header({ patient, lastRefreshed, setSearchTerm }) {
  const onSearch = (term) => {
  let _serchTerm = term.toUpperCase().replace(/P/g, "").trim();
    setSearchTerm(parseInt(_serchTerm))

  }

  const getTimeDiff = () => {
    const dateNow = new Date();
    const dateRefresh = new Date(lastRefreshed);
    const minDiff = Math.ceil((dateNow - dateRefresh) / (1000 * 60));
    const hourDiff = Math.ceil((dateNow - dateRefresh) / (1000 * 60 * 60));
    const dayDiff = Math.ceil((dateNow - dateRefresh) / (1000 * 60 * 60 * 24));
    return minDiff < 60 ? `${minDiff}M ago` 
            : hourDiff < 24 ? `${hourDiff}H ago`
              : `${dayDiff}D ago`;
  }

  const { patientId } = patient

  return (
    <Container>
      <Title>
        covid19india.org Tracker Live <Dot>&nbsp;&middot;&nbsp;</Dot> {getTimeDiff()}
      </Title>
      <SearchInput searchTerm={onSearch} />
      <PatientContainer>
        <Image src={getIcon(patient)} />
        <Name>P {patientId.toString().substring(2)}</Name>
      </PatientContainer>
    </Container>
  )
}

export default connect(null, {
  setSearchTerm
})(Header)
