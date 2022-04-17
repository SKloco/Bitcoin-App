import React from 'react'
import { NavLink } from 'react-router-dom'
import { ContactPreview } from './ContactPreview'
export function ContactList({ contacts, history }) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} />
      ))}
    </ul>
  )
}
