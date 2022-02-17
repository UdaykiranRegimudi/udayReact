import React from 'react'

const Data = React.createContext({
  appointmentsList: [],
  onAddItem: () => {},
  onAddTitle: () => {},
  titleInput: '',
  onChangeGender: () => {},
  gender: 'Male',
  onChangeDateInput: () => {},
  dateInput: '',
  onChangeErrorMsg: () => {},
  error: '',
  onChangeErrorStatus: () => {},
  errorStatus: false,
})

export default Data
