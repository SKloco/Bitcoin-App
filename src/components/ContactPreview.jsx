import React from 'react'

export function ContactPreview({ contact, onSelectContact, onRemoveContact }) {
  return (
    <li>
      <section className="contact-preview">
        <section className="info" onClick={() => onSelectContact(contact._id)}>
          <img src={`https://robohash.org/set_set5/${contact.name}.png`} alt="img" />
          <h4>{contact.name}</h4>
        </section>
      </section>
    </li>
  )
}
