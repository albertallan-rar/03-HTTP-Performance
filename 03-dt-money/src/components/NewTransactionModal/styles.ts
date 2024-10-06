import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import styled from 'styled-components'

// Container principal do modal de nova transação
export const NewTransactionModalContainer = styled.div`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme['gray-800']};
`

// Título do modal de nova transação
export const NewTransactionModalTitle = styled(Dialog.Title)`
  font-size: 1.5rem;
  font-weight: bold;
`

// Overlay (fundo escuro) do modal
export const NewTransactionModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

// Conteúdo do modal de nova transação
export const NewTransactionModalContent = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme['gray-800']};

  // Centraliza o modal na tela
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

// Botão de fechar o modal
export const NewTransactionModalClose = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  // Estilo do ícone de fechar
  color: ${({ theme }) => theme['gray-500']};
  cursor: pointer;

  border: 0;
  background: transparent;

  &:hover {
    color: ${({ theme }) => theme.white};
  }
`

// Elemento que aciona a abertura do modal
export const NewTransactionModalTrigger = styled(Dialog.Trigger)`
  cursor: pointer;
`

// Portal para renderizar o modal fora da hierarquia do DOM
export const NewTransactionModalPortal = styled(Dialog.Portal)`
  position: relative;
`

// Formulário dentro do modal de nova transação
export const NewTransactionModalForm = styled.form`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  // Estilo dos campos de entrada
  input {
    border-radius: 6px;
    border: 0;
    background: ${({ theme }) => theme['gray-900']};
    color: ${({ theme }) => theme.white};
    padding: 1rem;
  }

  // Estilo do botão de envio
  button[type='submit'] {
    height: 50px;
    border: 0;
    background: ${({ theme }) => theme['green-500']};
    color: ${({ theme }) => theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
  }
`

// Container para seleção de tipo de transação
export const TransactionType = styled(RadioGroup.Root)`
  display: flex;
  gap: 1rem;
`

// Estilo do ícone de seleção de tipo de transação
interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  flex: 1;
  background: ${({ theme }) => theme['gray-700']};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.white};
  border: 0;
  border-radius: 6px;
  padding: 1rem;

  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme['gray-500']};
  }

  &:hover {
    transition: background-color 0.2s;
    background: ${({ theme, variant }) =>
      variant === 'income' ? theme['green-500'] : theme['red-500']};
  }

  &[data-state='checked'] {
    color: ${({ theme }) => theme.white};
    background: ${({ theme, variant }) =>
      variant === 'income' ? theme['green-500'] : theme['red-500']};
    box-shadow: 0 0 0 2px
      ${({ theme, variant }) =>
        variant === 'income' ? theme['green-300'] : theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme['gray-600']};
  }
`

// Estilo do ícone de seleção de tipo de transação
export const ArrowUp = styled(ArrowUpIcon)`
  color: ${({ theme }) => theme['green-300']};
`

export const ArrowDown = styled(ArrowDownIcon)`
  color: ${({ theme }) => theme['red-300']};
`

export const SubmitButton = styled.button`
  height: 50px;
  border: 0;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
