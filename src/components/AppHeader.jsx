import React from 'react'

export function AppHeader(props) {
  return (
    <div>
      <button onClick={() => props.changePage('Home')}>Home</button>
      <button onClick={() => props.changePage('Contact')}>Contacts</button>
      <button onClick={() => props.changePage('ContactDetailsPage')}>ContactDetailsPage</button>
      <button onClick={() => props.changePage('StatisticPage')}>StatisticPage</button>
    </div>
  )
}
