import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "income" | "outcome";
  category: string;
  createdAt: string;
}

interface NewTransactionModalInputs {
  title: string;
  amount: number;
  type: "income" | "outcome";
  category: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: NewTransactionModalInputs) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line prettier/prettier
export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  // eslint-disable-next-line prettier/prettier
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const createTransaction = useCallback(async (data: NewTransactionModalInputs) => {
    // eslint-disable-next-line prettier/prettier
    const { title, amount, type, category } = data;

    // eslint-disable-next-line prettier/prettier
    const response = await api.post("/transactions", {
      title,
      amount,
      type,
      category,
      createdAt: new Date(),
    });

    setTransactions((state) => [...state, response.data]);
  }, []);

  const fetchTransactions = useCallback(async (query?: string) => {
    // eslint-disable-next-line prettier/prettier
    const response = await api.get("/transactions", {
      params: {
        q: query,
      },
    });

    const data: Transaction[] = await response.data;

    if (query) {
      const lowerQuery = query.toLowerCase();
      const filteredData = data.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(lowerQuery) ||
          transaction.category.toLowerCase().includes(lowerQuery),
      );
      setTransactions(filteredData);
    } else {
      setTransactions(data);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    // eslint-disable-next-line prettier/prettier
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
