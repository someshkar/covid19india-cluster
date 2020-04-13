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
        const district = document.getElementById('dvdistrict');
        const city = document.getElementById('dvcity');
        setdistrictOptions(getSortedValues(filterByObject(rawPatients, {
          state: value,
        }), 'district'));
        // Hide boxes
        if (value === '') 
        {
          district.style.display = 'none';
        }
        else 
        {
          district.style.display = 'block';
        }
        city.style.display = 'none';
        // Default to empty selection
        district.selectedIndex = 0;
        city.selectedIndex = 0;
        newFilters['district'] = '';
        newFilters['city'] = '';
        updatePatients(normalize(rawPatients.filter(x => x.state == value), false));
        var newGraph = rowsToGraph(rawPatients.filter(x => x.state == value), false, false);
        let filterState = [];
        filterState[value] = states[value];
        newGraph = addStates(newGraph, rawPatients.filter(x => x.state == value), filterState);
        updateGraph(newGraph);
      } else if (label === 'district') {
        const city = document.getElementById('dvcity');
        setdistrictOptions(getSortedValues(filterByObject(rawPatients, {
          state: filters.state,
          district: value,
        }), 'city'));
        console.log(value);
        // Hide box
        if (value === '') 
        {
          city.style.display = 'none'
        }
        else
        { 
          city.style.display = 'block';
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
  },[]);

  function getSortedValues(obj, key) {
    const setValues = new Set(obj.map((p) => p[key]));
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
 <div id="dvdistrict" style={{display: "none", "margin-top": "10px"}}>
<Select
        id="district"
        onChange={(value) => {
          handleFilters('district', value.label);}}
        options={districtOptions}
        isClearable={true}
        defaultValue={{ label: 'Select District', value: -1 }}
      />
</div>
<div id="dvcity" style={{display: "none", "margin-top": "10px"}}>
<Select
        id="city"
        onChange={(value) => {
          handleFilters('city', value.label);}}
        options={districtOptions}
        isClearable={true}
        defaultValue={{ label: 'Select City', value: -1 }}
      />    
  </div>
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
  