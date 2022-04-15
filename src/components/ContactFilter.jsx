import React, { Component } from 'react'

export class ContactFilter extends Component {
  state = {
    term: '',
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state)
    })
  }

  render() {
    const { term } = this.state
    return (
      <section>
        <section>
          <label htmlFor="search">Search</label>
          <input onChange={this.handleChange} type="term" id="term" name="term" value={term} />
        </section>
      </section>
    )
  }
}
