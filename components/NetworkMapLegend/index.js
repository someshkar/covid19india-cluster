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
import { setLegendFilter } from '../Redux/actions'

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

const NetworkMapLegend = ({ currentGlobalFilter, setLegendFilter, legendFilter }) => {



    const legendClickHandler = (term) => {
        console.log('term in legend component: ', term);
        if (legendFilter !== term) {
            setLegendFilter(term);
        }
    }

    return (
        <LegendContainer>
            <ImageContainer onClick={() => legendClickHandler('Recovered')}>
                <Image src={male_cured} />
                <Label>Recovered</Label>
            </ImageContainer>
            <ImageContainer onClick={() => legendClickHandler('Hospitalized')}>
                <Image src={male_hosp} />
                <Label>Hospitalized</Label>
            </ImageContainer>
            <ImageContainer onClick={() => legendClickHandler('Deceased')}>
                <Image src={male_dead} />
                <Label>Deceased</Label>
            </ImageContainer>
            {['State', 'City'].includes(currentGlobalFilter) ?
                <ImageContainer>
                    <Image src={state_node} />
                    <Label>State</Label>
                </ImageContainer>
                : null
            }
            {currentGlobalFilter === 'City' ?
                <ImageContainer>
                    <Image src={city_node} />
                    <Label>City</Label>
                </ImageContainer>
                : null
            }
            {currentGlobalFilter === 'Travel' ?
                <>
                    <ImageContainer>
                        <Image src={plane_local_node} />
                        <Label>Domestic</Label>
                    </ImageContainer>
                    <ImageContainer>
                        <Image src={plane_abroad_node} />
                        <Label>International</Label>
                    </ImageContainer>
                </>
                : null
            }
        </LegendContainer>
    )
}

const mapStateToProps = state => {
    let { legendFilter } = state
    return { legendFilter }
}

export default connect(mapStateToProps, { setLegendFilter })(NetworkMapLegend);
