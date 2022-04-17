import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { contactService } from '../services/contact.service'

export function ContactPreview({ contact }) {
  //  async componentDidMount() {
  //     await contactService.getContactById(this.history)
  //    }
  return (
    <Link to={`/contact/${contact._id}`}>
      <li>
        <section className="contact-preview">
          <section className="info">
            <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="img" />
            <h4>{contact.name}</h4>
          </section>
        </section>
      </li>
    </Link>
  )
}
