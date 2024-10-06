import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

export const TransactionsTableTh = styled.tr`
  padding: 1rem 2rem;
  text-align: left;
  background: ${({ theme }) => theme['gray-600']};
  color: ${({ theme }) => theme['gray-100']};
  font-size: 0.875rem;
  font-weight: bold;
`

export const TransactionsTableTd = styled.td`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme['gray-700']};
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ variant, theme }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`
