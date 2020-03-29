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
    cursor: pointer;
    align-items: center;
    margin-bottom: 0.5rem;


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

const NetworkMapLegend = ({ currentFilter,filterGraph }) => {
    const legendTypes = [{
        id:'Recovered',
        displayName: 'Recovered',
        imgSrc: male_cured
    },{
        id:'Hospitalized',
        displayName: 'Hospitalized',
        imgSrc: male_hosp
    },{
        id:'Deceased',
        displayName: 'Deceased',
        imgSrc: male_dead
    }]
    if(currentFilter === 'State' || currentFilter === 'City'){
        legendTypes.push({
            id:'State',
            displayName: 'State',
            imgSrc: state_node
        })
    }
    if(currentFilter === 'City'){
        legendTypes.push({
            id:'City',
            displayName: 'City',
            imgSrc: city_node
        })
    }
    if(currentFilter === 'Travel'){
        legendTypes.push({
            id:'Domestic',
            displayName: 'Domestic',
            imgSrc: plane_local_node
        })
        legendTypes.push({
            id:'International',
            displayName: 'International',
            imgSrc: plane_abroad_node
        })
    }

    const legends = []
    legendTypes.map(legend => {
        legends.push(<ImageContainer onClick={()=>filterGraph(legend.id)}>
        <Image src={legend.imgSrc} />
        <Label>{legend.displayName}</Label>
        </ImageContainer>)
    })

    return (
        <LegendContainer>
            {legends}
        </LegendContainer>
    )
}


export default NetworkMapLegend;
