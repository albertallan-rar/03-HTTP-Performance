import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          {transactions.map((transaction) => (
            <tbody key={transaction.id}>
              <tr>
                <td width="50%">{transaction.title}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === "income"
                      ? priceFormatter.format(transaction.amount)
                      : `- ${priceFormatter.format(transaction.amount)}`}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dataFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            </tbody>
          ))}
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
