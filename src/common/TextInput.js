import React from 'react'
import Input from 'react-toolbox/lib/input'

export const TextInput = ({ errorText, ...props }) => {
  return <section>
    <Input type="text" { ...props }/>
    {errorText && <div><br/><br/></div>}
  </section>
}
