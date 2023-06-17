// Write your code here

const TransactionItem = props => {
  console.log(props)
  const {eachList, onDeleteItem} = props
  const {amount, title, type} = eachList

  const onDeleteId = () => {
    onDeleteItem(eachList.id)
  }

  return (
    <li className="history-headers ">
      <p className="his-title">{title}</p>
      <p className="his-title">Rs {amount}</p>
      <p className="his-title">{type}</p>
      <button data-testid="delete" className="his-title" type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          onClick={onDeleteId}
        />
      </button>
    </li>
  )
}

export default TransactionItem
