import React from 'react'
import { ContactPreview } from './ContactPreview'
export function ContactList({ contacts ,onSelectContact,onRemoveContact}) {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactPreview onRemoveContact={onRemoveContact} onSelectContact={onSelectContact} key={contact._id} contact={contact} />
      ))}
    </ul>
  )
}
