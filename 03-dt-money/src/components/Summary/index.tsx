import { CircleArrowDown, CircleArrowUp, DollarSign } from "lucide-react";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";
import { SummaryCard, SummaryContainer } from "./styles";

// Componente Summary que exibe um resumo das transações financeiras
export function Summary() {
  // Obtém as transações do contexto TransactionsContext
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  );
  return (
    <SummaryContainer>
      {/* Card de Entradas */}
      <SummaryCard>
        <header>
          Entradas <CircleArrowUp size={32} color="#00b37e" />
        </header>
        <strong>
          {/* Calcula o total de entradas */}
          {priceFormatter.format(summary.income)}
        </strong>
      </SummaryCard>

      {/* Card de Saídas */}
      <SummaryCard>
        <header>
          Saídas <CircleArrowDown size={32} color="#f75a68" />
        </header>
        <strong>
          {/* Calcula o total de saídas */}
          {priceFormatter.format(summary.outcome)}
        </strong>
      </SummaryCard>

      {/* Card de Total (Saldo) */}
      <SummaryCard variant="green">
        <header>
          Total <DollarSign size={32} color="#fff" />
        </header>
        <strong>
          {/* Calcula o saldo total (entradas - saídas) */}
          {priceFormatter.format(summary.total)}
        </strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
