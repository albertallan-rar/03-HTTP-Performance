import { CircleArrowDown, CircleArrowUp, DollarSign } from 'lucide-react'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'
import { SummaryCard, SummaryContainer } from './styles'

// Componente Summary que exibe um resumo das transações financeiras
export function Summary() {
  const summary = useSummary()

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
  )
}
