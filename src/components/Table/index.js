import Data from '../../Context'
import './index.css'

const Table = props => {
  const {details} = props
  const {title, date, gender1} = details

  return (
    <Data.Consumer>
      {value => {
        const {onAddItem} = value
        onAddItem(details)

        return (
          <tr>
            <td>{title}</td>
            <td>{date}</td>
            <td>{gender1}</td>
          </tr>
        )
      }}
    </Data.Consumer>
  )
}

export default Table
