import React from 'react'
import styled from 'styled-components'

import { state, city, abroad } from '../../images/index'

const filters = [
  { name: 'State', icon: state },
  { name: 'City', icon: city },
]

const HeaderContainer = styled.div`
  padding-top: 10px;
  background-color: #f2f2f2;
  display: grid;
  grid-template-rows: 7% 93%;
  overflow: auto;
  font-family: 'Lato', sans-serif;
  color: #7c7a7a;
  font-weight: bold;
`

const FilterMenuContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 75%;
  overflow: auto;
  font-family: 'Lato', sans-serif;
  color: #7c7a7a;
  font-weight: bold;
`

const FilterCategory = ({ filter }) => {
  const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: '20vh';
    &:hover {
      background-color: #e7e7e7;
    }
  `
  const FilterName = styled.div`
    text-transform: uppercase;
    font-size: 11px;
  `

  const FilterIcon = styled.img`
    width: 40px;
  `

  return (
    <FilterContainer>
      <FilterIcon src={filter.icon} />
      <FilterName>{filter.name}</FilterName>
    </FilterContainer>
  )
}

const FilterPanel = () => {
  const FilterHeader = styled.div`
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
  `
  return (
    <HeaderContainer>
      <FilterHeader>Cluster Filter</FilterHeader>
      <FilterMenuContainer>
        {filters.map(filter => (
          <FilterCategory filter={filter} />
        ))}
      </FilterMenuContainer>
    </HeaderContainer>
  )
}

export default FilterPanel
