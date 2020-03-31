import React, { Fragment } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import _ from 'lodash'

import { state, city, abroad, p2p, hide } from '../../images/index'
import {
  addStates,
  removeStates,
  addCities,
  removeCities,
  addTravel,
  removeTravel,
} from '../../util/filters'
import { updateGraph, selectFilter } from '../Redux/actions'

const filters = [
  {
    name: 'P2P',
    icon: p2p,
    add: graph => {
      return graph
    },
    remove: graph => {
      return graph
    },
  },
  { name: 'State', icon: state, add: addStates, remove: removeStates },
  { name: 'City', icon: city, add: addCities, remove: removeCities },
  { name: 'Hide', icon: hide, add: () => {}, remove: () => {} },
  { name: 'Travel', icon: abroad, add: addTravel, remove: removeTravel },
]

//{ name: 'Travel', icon: abroad, add: addTravel, remove: removeTravel },

const HeaderContainer = styled.div`
  padding: 10px 0px;
  background-color: #f2f2f2;
  grid-template-rows: 15% 93%;
  overflow: auto;
  font-family: 'Lato', sans-serif;
  color: #7c7a7a;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr;
    grid-template-columns: 20% 80%;
    padding-top: 0;
  }
`

const FilterMenuContainer = styled.div`
  grid-template-rows: 10% 10% 10% 10% 60%;
  overflow: auto;
  font-family: 'Lato', sans-serif;
  color: #7c7a7a;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }
`

const FilterCategory = ({ filter, onClick, selected }) => {
  const FilterContainer = styled.div`
    display: flex;
    margin: 10px 0;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${props => (props.selected ? '#d6d6d6' : '#F2F2F2')};
    transition: all 0.2s ease-out;
    
    &:hover {
      background-color: #d7d7d7;
    }
  `
  const FilterName = styled.div`
    text-transform: uppercase;
    font-size: 11px;
  `

  const FilterIcon = styled.img`
    width: 30px;
  `

  return (
    <FilterContainer onClick={onClick} selected={selected}>
      <FilterIcon src={filter.icon} />
      <FilterName>{filter.name}</FilterName>
    </FilterContainer>
  )
}

const FilterPanel = ({
  graph,
  patients,
  updateGraph,
  selectFilter,
  filter,
  states,
  onFilterSelect,
}) => {
  // const [selected, selectCategory] = React.useState('P2P')

  const changeGraph = name => {
    // console.log('Changegraph', graph, patients.byId)
    let currentFilter = _.find(filters, function(o) {
      return o.name === filter
    })
    let choosenFilter = _.find(filters, function(o) {
      return o.name === name
    })

    let newGraph = currentFilter.remove(graph, patients.byId, states)

    selectFilter(name)
    newGraph = choosenFilter.add(newGraph, patients.byId, states)
    console.log(newGraph)
    onFilterSelect(name)
    updateGraph(newGraph)
  }
  const FilterHeader = styled.div`
    text-align: center;
    text-transform: uppercase;
    font-size: 10px;

    @media screen and (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
  return (
    <HeaderContainer>
      <FilterHeader>Cluster Filter</FilterHeader>
      <FilterMenuContainer>
        {filters.map((filterItem, filterIndex) => (
          <Fragment key={filterIndex}>
            <FilterCategory
              filter={filterItem}
              onClick={() => changeGraph(filterItem.name)}
              selected={filter === filterItem.name ? true : false}
            />
          </Fragment>
        ))}
      </FilterMenuContainer>
    </HeaderContainer>
  )
}

const mapStateToProps = state => {
  const { patients, graph, filter, states } = state
  return { graph, patients, filter, states }
}

export default connect(mapStateToProps, { updateGraph, selectFilter })(
  FilterPanel
)
