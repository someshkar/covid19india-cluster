import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { updateRawPatients, updatePatients, updateGraph } from '../Redux/actions'
import { connect } from 'react-redux'
import normalize from '../../util/normalize'
import { rowsToGraph } from '../../util/parse'
import {
  addStates,
  removeStates,
  addCities,
  removeCities,
  addTravel,
  removeTravel,
} from '../../util/filters'

function filterByObject(obj, filters) {
  const keys = Object.keys(filters);
  return obj.filter((p) => {
    return keys.every((key) => {
      if (!filters[key].length) return true;
      return p[key] === filters[key];
    });
  });
}

const ExtendedFilter = ({rawPatients,
updateGraph,
updatePatients,
graph,
patients,
states
}) => 
 {
  const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: #858383;
  `
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    city: ''
  });
  
  const addFilters = [
    { name: 'State',  add: addStates, remove: removeStates },
    { name: 'City',  add: addCities, remove: removeCities },
    { name: 'Travel',  add: addTravel, remove: removeTravel },
  ]
  const handleFilters = (label, value) => {
    setFilters((f) => {
      // Create new object (deep copy)
      const newFilters = {...f};
      newFilters[label] = value;
      if (label === 'state') {
        const district = document.getElementById('district');
        const city = document.getElementById('city');
        const lbldistrict = document.getElementById('lbldistrict');
        const lblcity = document.getElementById('lblcity');
        // Hide boxes
        if (value === '') 
        {
          district.style.display = 'none';
          lbldistrict.style.display = 'none';
        }
        else 
        {
          district.style.display = 'inline';
          lbldistrict.style.display = 'inline';
        }
        city.style.display = 'none';
        lblcity.style.display = 'none';
        // Default to empty selection
        district.selectedIndex = 0;
        city.selectedIndex = 0;
        newFilters['district'] = '';
        newFilters['city'] = '';
        updatePatients(normalize(rawPatients.filter(x => x.state == value), false));
        var newGraph = rowsToGraph(rawPatients.filter(x => x.state == value), false);
        let filterState = [];
        filterState[value] = states[value];
        console.log(filterState);
        newGraph = addStates(newGraph, rawPatients.filter(x => x.state == value), filterState);
        updateGraph(newGraph);
      } else if (label === 'district') {
        const city = document.getElementById('city');
        // Hide box
        if (value === '') 
        {
          city.style.display = 'none'
          lblcity.style.display = 'none'
        }
        else
        { 
          city.style.display = 'inline';
          lblcity.style.display = 'inline'
        }
        // Default to empty selection
        city.selectedIndex = 0;
        newFilters['city'] = '';
        updatePatients(normalize(rawPatients.filter(x => x.district == value), false));
        updateGraph(rowsToGraph(rawPatients.filter(x => x.district == value), false));
      }
      else if(label == 'city')
      {
        updatePatients(normalize(rawPatients.filter(x => x.city == value), false));
        updateGraph(rowsToGraph(rawPatients.filter(x => x.city == value), false));
      }
       
      return newFilters;
    }
   )
  };

  function getSortedValues(obj, key) {
    const setValues = new Set(obj.map((p) => p[key]));
    if (setValues.size > 1) setValues.add('');
    return Array.from(setValues).sort();
  }
  
  return (
 
<div className="filters-left">
  <br></br>
  <Title>
        State, District and city filter:
  </Title>
<div className="select">
  <label>  State: </label>

  <select
    style={{animationDelay: '0.3s'}}
    id="state"
    onChange={(event) => {
      handleFilters('state', event.target.value);
    }}
  >
    <option value="" disabled selected>
      Select State
    </option>
    {getSortedValues(rawPatients, 'state').map(
      (state, index) => {
        return (
          <option key={index} value={state}>
            {state === '' ? 'All' : state}
          </option>
        );
      }
    )}
  </select>
</div>

<div className="select">
 <label id='lbldistrict' style={{display:'none'}}>District: </label> 
  <select
    style={{animationDelay: '0.4s', display: 'none'}}
    id="district"
    onChange={(event) => {
      handleFilters('district', event.target.value);
    }}
  >
    <option value="" disabled selected>
      Select District
    </option>
    {getSortedValues(
      filterByObject(rawPatients, {
        state: filters.state,
      }),
      'district'
    ).map((district, index) => {
      return (
        <option key={index} value={district}>
          {district === '' ? 'All' : district}
        </option>
      );
    })}
  </select>
</div>

<div className="select">
  <label id="lblcity" style={{display:'none'}}>City:</label>
  <select
    style={{animationDelay: '0.4s', display: 'none'}}
    id="city"
    onChange={(event) => {
      handleFilters('city', event.target.value);
    }}
  >
    <option value="" disabled selected>
      Select City
    </option>
    {getSortedValues(
      filterByObject(rawPatients, {
        state: filters.state,
        district: filters.district,
      }),
      'city'
    ).map((city, index) => {
      return (
        <option key={index} value={city}>
          {city === '' ? 'All' : city}
        </option>
      );
    })}
  </select>
</div>
<br></br>
<hr></hr>
</div>
  )
}
const mapStateToProps = state => {
  let { rawPatients, patients, graph, states} = state
  return { rawPatients, patients, graph, states}
}

  export default connect(mapStateToProps, {
    updateRawPatients,
    updatePatients,
    updateGraph
  })(ExtendedFilter)
  