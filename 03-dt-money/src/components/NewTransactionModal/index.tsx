import * as Dialog from "@radix-ui/react-dialog";
import { CircleArrowDown, CircleArrowUp, X } from "lucide-react";
import { NewTransactionButton } from "../Header/styles";
import {
  NewTransactionModalClose,
  NewTransactionModalContent,
  NewTransactionModalForm,
  NewTransactionModalOverlay,
  NewTransactionModalPortal,
  NewTransactionModalTrigger,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

export function NewTransactionModal() {
  return (
    <Dialog.Root>
      <NewTransactionModalTrigger asChild>
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </NewTransactionModalTrigger>

      <NewTransactionModalPortal>
        <NewTransactionModalOverlay />
        <NewTransactionModalContent>
          <Dialog.Title>Nova transação</Dialog.Title>

          <NewTransactionModalForm>
            <input type="text" placeholder="Descrição" required />
            <input type="number" placeholder="Preço" required />
            <input type="text" placeholder="Categoria" required />

            <TransactionType>
              <TransactionTypeButton variant="income" value="income">
                <CircleArrowUp size={24} color="green" />
                Entrada
              </TransactionTypeButton>
              <TransactionTypeButton variant="outcome" value="outcome">
                <CircleArrowDown size={24} color="red" />
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <button type="submit">Cadastrar</button>
          </NewTransactionModalForm>
          <NewTransactionModalClose asChild>
            <X size={24} />
          </NewTransactionModalClose>
        </NewTransactionModalContent>
      </NewTransactionModalPortal>
    </Dialog.Root>
  );
}
