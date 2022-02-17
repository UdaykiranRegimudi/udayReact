import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import Table from '../Table'

import './index.css'

class Home extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    gender: 'Male',
    error: '',
    errorStatus: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput, gender} = this.state
    if (titleInput === '') {
      this.setState({error: 'Please Enter User Name', errorStatus: true})
    } else if (dateInput === '') {
      this.setState({error: 'Please Provide Valid Date', errorStatus: true})
    } else if (gender === '') {
      this.setState({error: 'Please Select Your Gender', errorStatus: true})
    } else {
      const formattedDate = dateInput
        ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
        : ''
      const newAppointment = {
        id: v4(),
        title: titleInput,
        date: formattedDate,
        gender1: gender,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
        gender: 'Male',
        error: '',
        errorStatus: false,
      }))
    }
  }

  onChangeGender = event => {
    this.setState({gender: event.target.value})
  }

  render() {
    const {
      titleInput,
      dateInput,
      gender,
      appointmentsList,
      error,
      errorStatus,
    } = this.state

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Your Details</h1>
                <label htmlFor="title" className="label">
                  Name
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Name"
                />
                <label htmlFor="date" className="label">
                  DATE OF BIRTH
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <label htmlFor="gender" className="label">
                  GENDER
                </label>
                <select
                  className="input"
                  id="gender"
                  onChange={this.onChangeGender}
                  value={gender}
                >
                  <option name="Male">Male</option>
                  <option name="Female">Female</option>
                </select>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            {errorStatus && <p className="error">*{error}</p>}
            <hr className="hr" />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsList.map(each => (
                  <Table key={each.id} details={each} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
