import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {

    let income=0, outcome=0

  for(let i = 0; i < this.transactions.length; i++) {
    if(this.transactions[i].type =='income')
     income += this.transactions[i].value
    else
    outcome += this.transactions[i].value
  }

  let total = income - outcome

  const balance = {income,outcome,total}

    return balance

  }


  public create({title, value, type}:TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type})


    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
