import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useDebounce from '../../util/useDebounce'

const Input = styled.input`
  margin: 10px;
  background: #ccc;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 3px;
  width: calc(100% - 16px);
`

export const SearchInput = ({ searchTerm }) => {

  const [term, setTerm] = useState('')
  const debouncedTerm = useDebounce(term)

  useEffect(() => {
    if (debouncedTerm) {
      searchTerm(debouncedTerm)
    }
  }, [debouncedTerm])

  const handleTextChange = (e) => {
    setTerm(e.target.value)
  }

  return (
    <Input
      placeholder={'Search for a patient'}
      value={term}
      onChange={handleTextChange}
      aria-label='Search input'
    />
  )

}
