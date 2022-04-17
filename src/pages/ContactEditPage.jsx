import { Component, createRef } from 'react'
import { contactService } from '../services/contact.service'

export class ContactEditPage extends Component {
  state = {
    contact: null,
    changed: false,
  }
  async componentDidMount() {
    const id = this.props.match.params.id
    const contact = id ? await contactService.getContactById(id) : contactService.getEmptyContact()
    this.setState({ contact }, () => {})
  }
  onRemoveContact = async () => {
    const contact = await contactService.deleteContact(this.state.contact._id)
    this.setState({ contact }, () => this.onBack())
  }

  handleChange = async ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }))
    this.setState({ changed: true })
  }
  onSaveContact = async () => {
    const contact = await contactService.saveContact(this.state.contact)
    this.setState({ contact }, () => this.onBack())
  }
  onBack = () => {
    if (this.state.contact._id) this.props.history.push(`/contact/${this.state.contact._id}`)
    this.props.history.push('/contact')
  }

  render() {
    const { contact, changed } = this.state
    if (!contact) return <div>Loading...</div>
    return (
      <section className="edit-page">
        <section>
          <form onSubmit={this.onSaveContact}>
            <span className="container">
              <label htmlFor="name">Name</label>
              <input type="text" onChange={this.handleChange} value={contact.name} name="name" id="name" />
            </span>
            <span className="container">
              <label htmlFor="email">Email</label>
              <input type="email" onChange={this.handleChange} value={contact.email} name="email" id="email" />
            </span>
            <span className="container">
              <label htmlFor="phone">Phone</label>
              <input type="tel" onChange={this.handleChange} value={contact.phone} name="phone" id="phone" />
            </span>
          </form>
        </section>
        {this.props.match.params.id && (
          <section>
            <button onClick={this.onRemoveContact}>Delete</button>
          </section>
        )}
        {changed === true && (
          <section>
            <button onClick={this.onSaveContact}>Save</button>
          </section>
        )}
        <section>
          <button onClick={this.onBack}>BACK</button>
        </section>
      </section>
    )
  }
}
