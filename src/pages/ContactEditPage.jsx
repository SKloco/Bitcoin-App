import { Component, createRef } from 'react'
import { contactService } from '../services/contact.service'
import { connect } from 'react-redux'
import { removeContact, saveContact } from '../store/actions/contactActions'

export class _ContactEditPage extends Component {
  state = {
    contact: null,
    changed: false,
  }

  // inputRef = createRef()

  async componentDidMount() {
    const id = this.props.match.params.id
    const contact = id ? await contactService.getContactById(id) : contactService.getEmptyContact()
    this.setState({ contact }, () => {})
    console.log('inputref', this.inputRef)
    this.inputRef.current.focus()
  }
  onRemoveContact = async () => {
    await this.props.removeContact(this.state.contact._id)
    this.props.history.push('/contact')
  }

  handleChange = async ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }))
    this.setState({ changed: true })
  }
  onSaveContact = async () => {
    // const contact =
    this.props.saveContact(this.state.contact)
    // this.setState({ contact }, () => this.onBack())
    this.onBack()
  }
  onBack = () => {
    if (this.state.contact._id) this.props.history.push(`/contact/${this.state.contact._id}`)
    else this.props.history.push('/contact')
  }
  inputRef = (input) => {
    if (input) input.focus()
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
              <input ref={this.inputRef} onChange={this.handleChange} value={contact.name} type="text" name="name" id="name" />
            </span>
            <span className="container">
              <label htmlFor="email">Email</label>
              <input onChange={this.handleChange} value={contact.email} type="email" name="email" id="email" />
            </span>
            <span className="container">
              <label htmlFor="phone">Phone</label>
              <input onChange={this.handleChange} value={contact.phone} type="tel" name="phone" id="phone" />
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
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  removeContact,
  saveContact,
}

export const ContactEditPage = connect(mapStateToProps, mapDispatchToProps)(_ContactEditPage)
