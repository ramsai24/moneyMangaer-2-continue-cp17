import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: 'INCOME',
    transactionList: [],
  }

  titleUpdate = event => {
    this.setState({title: event.target.value})
  }

  amountUpdate = event => {
    this.setState({amount: event.target.value})
  }

  typeUpdate = event => {
    this.setState({type: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()

    const {type, amount, title} = this.state

    if (type === 'INCOME') {
      this.setState(prev => ({
        balance: parseInt(prev.balance) + parseInt(amount),
        income: parseInt(prev.income) + parseInt(amount),
        transactionList: [
          ...prev.transactionList,
          {id: v4(), title, amount, type},
        ],
        title: '',
        amount: '',
        type: '',
      }))
    } else {
      this.setState(prev => ({
        balance: parseInt(prev.balance) - parseInt(amount),
        expenses: parseInt(prev.expenses) + parseInt(amount),
        transactionList: [
          ...prev.transactionList,
          {id: v4(), title, amount, type},
        ],
        title: '',
        amount: '',
        type: '',
      }))
    }
  }

  onDeleteItems = id => {
    console.log(id)
    const {transactionList} = this.state

    const updateList = transactionList.filter(each => each.id !== id)

    const idList = transactionList.find(each => each.id === id)
    console.log(idList.type === 'INCOME')

    if (idList.type === 'INCOME') {
      this.setState(prev => ({
        transactionList: [...updateList],
        balance: prev.balance - parseInt(idList.amount),
        income: prev.income - parseInt(idList.amount),
      }))
    } else {
      this.setState(pre => ({
        transactionList: [...updateList],
        balance: pre.balance + parseInt(idList.amount),
        expenses: pre.expenses - parseInt(idList.amount),
      }))
    }
  }

  render() {
    const {
      balance,
      income,
      expenses,
      title,
      type,
      amount,
      transactionList,
    } = this.state

    // console.log(transactionList)
    // console.log(type)
    console.log(this.state)
    console.log(type)

    return (
      <div className="app-container">
        <div className="bg-container">
          <div>
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <MoneyDetails variables={{balance, income, expenses}} />

          <div className="addTransaction-history-container">
            <form className="add-transaction-container" onSubmit={this.onAdd}>
              <h1>Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                type="text"
                placeholder="TITLE"
                onChange={this.titleUpdate}
                value={title}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                id="amount"
                type="text"
                placeholder="AMOUNT"
                onChange={this.amountUpdate}
                value={amount}
              />
              <label htmlFor="type">TYPE</label>
              <select id="type" onChange={this.typeUpdate}>
                {
                  transactionTypeOptions.map(options =>
                    options.optionId === 'INCOME' ? (
                      <option
                        value={options.optionId}
                        selected
                        key={options.optionId}
                      >
                        {options.displayText}
                      </option>
                    ) : (
                      <option value={options.optionId} key={options.optionId}>
                        {options.displayText}
                      </option>
                    ),
                  )
                  //
                }
              </select>
              <button type="button" onClick={this.onAdd}>
                Add
              </button>
            </form>
            <div className="history-container">
              <h1>History</h1>
              {/* <div> */}
              <div className="history-headers">
                <p className="his-title">Title</p>
                <p className="his-title">Amount</p>
                <p className="his-title">Type</p>
              </div>
              <ul className="list-items">
                {transactionList.map(each => (
                  <TransactionItem
                    key={each.id}
                    eachList={each}
                    onDeleteItem={this.onDeleteItems}
                  />
                ))}
              </ul>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
