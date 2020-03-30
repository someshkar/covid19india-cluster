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
    oneTo20,
    twentyTo30,
    thirtyTo40,
    fortyTo50,
    fiftyTo60,
    sixtyTo70,
    seventyUp
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

const NetworkMapLegend = ({ currentFilter }) => {
    return (
        <LegendContainer>
            <ImageContainer>
                <Image src={male_cured} />
                <Label>Recovered</Label>
            </ImageContainer>
            <ImageContainer>
                <Image src={male_hosp} />
                <Label>Hospitalized</Label>
            </ImageContainer>
            <ImageContainer>
                <Image src={male_dead} />
                <Label>Deceased</Label>
            </ImageContainer>
            {['State', 'City'].includes(currentFilter) ?
                <ImageContainer>
                    <Image src={state_node} />
                    <Label>State</Label>
                </ImageContainer>
                : null
            }
            {currentFilter === 'City' ?
                <ImageContainer>
                    <Image src={city_node} />
                    <Label>City</Label>
                </ImageContainer>
                : null
            }
            {currentFilter === 'Travel' ?
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
            {currentFilter === 'Age' ?
                <>
                    <ImageContainer>
                        <Image src={oneTo20} />
                        <Label>01 - 20 Age</Label>
                    </ImageContainer>
                    <ImageContainer>
                        <Image src={twentyTo30} />
                        <Label>20 - 30 Age</Label>
                    </ImageContainer>
                    <ImageContainer>
                        <Image src={thirtyTo40} />
                        <Label>30 - 40 Age</Label>
                    </ImageContainer>
                    <ImageContainer>
                        <Image src={fiftyTo60} />
                        <Label>40 - 50 Age</Label>
                    </ImageContainer>
                    <ImageContainer>
                        <Image src={sixtyTo70} />
                        <Label>60 - 70 Age</Label>
                    </ImageContainer>
                    <ImageContainer>
                        <Image src={seventyUp} />
                        <Label>70 up Age</Label>
                    </ImageContainer>
                </>
                : null
            }
        </LegendContainer>
    )
}


export default NetworkMapLegend;
