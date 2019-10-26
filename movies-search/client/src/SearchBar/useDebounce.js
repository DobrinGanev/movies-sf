import {useState, useEffect} from 'react'

/*
need to debounce to prevent hitting the server on each key stroke
simple debounce hook. no need for lodash or other heavy libs
*/
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
