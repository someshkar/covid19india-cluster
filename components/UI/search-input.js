import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useDebounce from '../../util/useDebounce'
import { useSelector } from 'react-redux'

const Input = styled.input`
  margin: 10px;
  background: #fff;
  font-size: 16px;
  padding: 10px;
  outline: none;
  border: 1px solid #cec1c1;
  border-radius: 3px;
  width: calc(100% - 16px);
  &:focus {
    border: 1px solid #f2994a;
  }
`

const Checkbox = props => (
    <input type="checkbox" {...props} />
)

export const SearchInput = ({ searchTerm, edgeNodeFilter }) => {
  const [term, setTerm] = useState('')
  const [removeNonEdgeNode, changeRemoveNonEdgeNodeValue] = useState(false)
  const debouncedTerm = useDebounce(term)
  const { filterState } = useSelector(state => ({
      filterState: state.filter === 'P2P'
  }))

  useEffect(() => {
    if (debouncedTerm) {
      searchTerm(debouncedTerm)
    }
  }, [debouncedTerm])

  useEffect(() => {
      edgeNodeFilter(removeNonEdgeNode)
  }, [removeNonEdgeNode])

  const handleTextChange = e => {
    setTerm(e.target.value)
  }

  const handleCheckBoxChange = e => {
      changeRemoveNonEdgeNodeValue(e.target.checked)
  }

  return (
    <div>
      <Input
        placeholder="Type patient number to search..."
        value={term}
        onChange={handleTextChange}
        aria-label="Search input"
      />
      <label hidden={!filterState}>
        <Checkbox
          checked={removeNonEdgeNode}
          onChange={handleCheckBoxChange}
        />
        <span>Remove non contracted patients</span>
      </label>
    </div>
  )
}
