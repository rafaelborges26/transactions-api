import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string
  value: number
  type: string
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}:RequestDTO): Transaction {


    if(type !== 'outcome' && type !== 'income' ){

      throw Error('The type should be income or outcome')

    }

    const balance = this.transactionsRepository.getBalance()
    if(type === 'outcome' && value > balance.total ) {
      throw Error('The value is biggest than total')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction
  }
}

export default CreateTransactionService;
