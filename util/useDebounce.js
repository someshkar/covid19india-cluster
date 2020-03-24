import React, { useState, useEffect } from 'react'

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
      }
    },
    [value] 
  )

  return debouncedValue
}
