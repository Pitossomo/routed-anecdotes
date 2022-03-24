import { useState } from 'react'

const useField = (type) => {
  const initialValue = (type === 'number' ? 0 : '') 
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return [
    { type, value, onChange },
    reset
  ]
}

export { useField }