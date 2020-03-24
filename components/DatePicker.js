import { useState } from 'react'
import styled from 'styled-components'
import DayPicker from 'react-day-picker'

import { connect } from 'react-redux'
import { updateGraph, selectFilter } from './Redux/actions'
import { rowsToGraph } from '../util/parse'
import { isBrowser } from 'react-device-detect'

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 10px;
  right: 10px;
`

function DatePicker({ updateGraph, selectFilter }) {
  const [selectedDay, changeSelectedDay] = useState(new Date())

  function handleDayClick(date) {
    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }

    const newDate = formatDate(date)

    if (formatDate(selectedDay) !== newDate) {
      console.log(newDate)
      changeSelectedDay(date)

      const apiURL =
        'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/patientdb/' +
        newDate

      fetch(apiURL, {
        cors: 'no-cors',
        method: 'GET',
        redirect: 'follow',
      })
        .then(resp => resp.json())
        .then(res => {
          console.log(res)
          updateGraph(rowsToGraph(res.data.rawPatientData))
          selectFilter('P2P')
        })
    }
  }

  return (
    <Container>
      {isBrowser ? (
        <DayPicker
          selectedDays={selectedDay}
          onDayClick={day => handleDayClick(day)}
          disabledDays={[
            {
              before: new Date(2020, 2, 23),
              after: new Date(),
            },
          ]}
        />
      ) : null}
    </Container>
  )
}

export default connect(null, { updateGraph, selectFilter })(DatePicker)
