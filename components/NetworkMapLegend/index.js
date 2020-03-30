import { useEffect } from 'react';
import styled from 'styled-components'
import {
    male_hosp,
    male_cured,
    male_dead,
    state_node,
    city_node,
    plane_abroad_node,
    plane_local_node,
} from '../../images/index'
import { connect, useSelector } from 'react-redux'
import { updateLegendFilter, updateGraph, updateSidePanelPatient } from '../Redux/actions'
import { filterPatients } from '../../util/filters'

const LegendContainer = styled.div`
    position: absolute;
    top: 0;
    left: 30%;
    display: flex;
    flex-direction: column;
    background: #fafafa;
    padding: 5px;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    margin-left: 5px;
    margin-top: 5px;
    z-index: 2;
    
    
    @media screen and (max-width: 768px) {
        padding: 4px;
        left 0%;
    }
`


const Image = styled.img`
    height: 25px;
    
    @media screen and (max-width: 768px) {
        height: 8.75px;
    }
`

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    cursor: pointer;

    & :last-of-type {
        margin-bottom: 0;
    }
`

const Label = styled.span`
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    margin-left: 0.3rem;
    
    @media screen and (max-width: 768px) {
        font-size: 7px;
    }
`

const patientTypes = [
    {
        label: 'Recovered',
        image: male_cured,
        forGlobalFilters: ['All']
    },
    {
        label: 'Hospitalized',
        image: male_hosp,
        forGlobalFilters: ['All']
    },
    {
        label: 'Deceased',
        image: male_dead,
        forGlobalFilters: ['All']
    },
    {
        label: 'State',
        image: state_node,
        forGlobalFilters: ['State', 'City']
    },
    {
        label: 'City',
        image: city_node,
        forGlobalFilters: ['City']
    },
    {
        label: 'Domestic',
        image: plane_local_node,
        forGlobalFilters: ['Travel']
    },
    {
        label: 'International',
        image: plane_abroad_node,
        forGlobalFilters: ['Travel']
    },
]







const NetworkMapLegend = ({ globalFilter, updateLegendFilter, updateGraph, updateSidePanelPatient, legendFilter, graph, patients }) => {



    const legendClickHandler = (term) => {
        if (legendFilter !== term && !['Domestic', 'International'].includes(term)) {

            let newGraph = filterPatients(graph, patients.byId, term, globalFilter)
            updateGraph(newGraph)
            console.log('NEW GRAPH: ', newGraph);

            updateLegendFilter(term)
            // update side panel patient to show the correct patient(patient should be one from the visible list of nodes)
            updateSidePanelPatient(newGraph.nodes[0].id)

        }
    }

    const patientLegend = (item) => {
        if (item.forGlobalFilters.includes('All') || item.forGlobalFilters.includes(globalFilter)) {
            return (
                <ImageContainer onClick={() => legendClickHandler(item.label)}>
                    <Image src={item.image} />
                    <Label style={{fontWeight: item.label === legendFilter ? 'bold' : 'normal'}}>{item.label}</Label>
                </ImageContainer>
            )
        }
    }


    return (
        <LegendContainer>
            {patientTypes.map(item => patientLegend(item))}
        </LegendContainer>
    )
}

const mapStateToProps = state => {
    let { legendFilter, graph, patients, filter } = state
    return { legendFilter, graph, patients, globalFilter: filter }
}

export default connect(mapStateToProps, { updateLegendFilter, updateGraph, updateSidePanelPatient })(NetworkMapLegend);
