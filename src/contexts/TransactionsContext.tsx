import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface transaction {
    id: number;
    description: string; 
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionInput {
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
}
interface TransactionContextType {
    transactions: transaction[];
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode;
}


export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps){

    const [transactions, setTransactions] = useState<transaction[]>([])

    async function fetchTransactions(query?: string){
        // console.log('Fetching with query:', query);

        const response = await api.get('transactions', {
            params:{
                _sort: 'price',
                _order: 'asc',
                // description_like: query,
                // q: query
            }
        })

        const filteredData = query
        ? response.data.filter((transaction: transaction) => 
            transaction.description.toLowerCase().includes(query.toLowerCase())
          )
        : response.data;

        // console.log('Response data:', response.data);
        setTransactions(filteredData)
    }

    async function createTransaction(data: CreateTransactionInput) {
        const { description,category,price,type } = data;

        const response = await api.post('transactions',{
            description,
            category,
            price,
            type,
            createdAt: new Date()
        })

        setTransactions(state => [response.data,...state])
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}
