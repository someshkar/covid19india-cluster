import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { updateRawPatients, updatePatients, updateGraph } from '../Redux/actions'
import { connect } from 'react-redux'
import normalize from '../../util/normalize'
import { rowsToGraph } from '../../util/parse'
import Select from 'react-select';
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
const mystyle = {
  dislay: "None"
};

const ExtendedFilter = ({rawPatients,
updateGraph,
updatePatients,
graph,
patients,
states
}) => 
 {
  const [stateOptions, setstateOptions] = useState([]);
  const [districtOptions, setdistrictOptions] = useState([]);  
  const [cityOptions, setCityOptions] = useState([]);
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
        // Hide boxes
        if (value === '') 
        {
          district.style.display = 'none';
        }
        else 
        {
          district.style.display = 'inline';
        }
        city.style.display = 'none';
        // Default to empty selection
        district.selectedIndex = 0;
        city.selectedIndex = 0;
        newFilters['district'] = '';
        newFilters['city'] = '';
        console.log(label);
        console.log(value);
        updatePatients(normalize(rawPatients.filter(x => x.state == value), false));
        var newGraph = rowsToGraph(rawPatients.filter(x => x.state == value), false, false);
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
        }
        else
        { 
          city.style.display = 'inline';
        }
        // Default to empty selection
        city.selectedIndex = 0;
        newFilters['city'] = '';
        updatePatients(normalize(rawPatients.filter(x => x.district == value), false));
        updateGraph(rowsToGraph(rawPatients.filter(x => x.district == value), false, false));
      }
      else if(label == 'city')
      {
        updatePatients(normalize(rawPatients.filter(x => x.city == value), false));
        updateGraph(rowsToGraph(rawPatients.filter(x => x.city == value), false, false));
      }
       
      return newFilters;
    }
   )
  };
 
  useEffect(() => {
    setstateOptions(getSortedValues(rawPatients, 'state'));
    setdistrictOptions(getSortedValues(rawPatients, 'district'));
    setdistrictOptions(getSortedValues(rawPatients, 'city'));
  },[]);

  function getSortedValues(obj, key) {
    const setValues = new Set(obj.map((p) => p[key]));
    if (setValues.size > 1) setValues.add('All');
    let returnValue = Array.from(setValues).sort().map((x, i) => 
    {
      return {'value': i, 'label':x};
    })
    return returnValue;
  }
  
  return (
 
<div className="filters-left">
  <br></br>
  <Title>
        State, District and city filter:
  </Title>
  <br></br>
<div className="select">
<Select
        id="state"
        onChange={(value) => {
          handleFilters('state', value.label);}}
        options={stateOptions}
        isClearable={true}
        defaultValue={{ label: 'Select State', value: -1 }}

      />

<Select
        id="district"
        onChange={(value) => {
          handleFilters('district', value);}}
        options={districtOptions}
        isClearable={true}
        defaultValue={{ label: 'Select District', value: -1 }}
        styles={mystyle}
      />

<Select
        id="city"
        onChange={(value) => {
          handleFilters('city', value);}}
        options={districtOptions}
        isClearable={true}
        defaultValue={{ label: 'Select City', value: -1 }}
        styles={mystyle}
      />    
</div>

<div className="select">
 <label id='lbldistrict' style={{display:'none'}}>District: </label> 
<br></br>
<hr></hr>
</div>
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
  