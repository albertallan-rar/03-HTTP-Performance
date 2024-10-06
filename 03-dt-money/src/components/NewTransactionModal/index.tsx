import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { CircleArrowDown, CircleArrowUp, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { NewTransactionButton } from "../Header/styles";
import {
  NewTransactionModalClose,
  NewTransactionModalContent,
  NewTransactionModalForm,
  NewTransactionModalOverlay,
  NewTransactionModalPortal,
  NewTransactionModalTrigger,
  SubmitButton,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

const newTransactionModalSchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["income", "outcome"]),
  category: z.string(),
});

type NewTransactionModalInputs = z.infer<typeof newTransactionModalSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction;
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<NewTransactionModalInputs>({
    resolver: zodResolver(newTransactionModalSchema),
  });

  async function handleCreateNewTransaction(data: NewTransactionModalInputs) {
    const { title, amount, type, category } = data;

    await createTransaction({
      title,
      amount,
      type,
      category,
    });
  }

  return (
    <Dialog.Root>
      <NewTransactionModalTrigger asChild>
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </NewTransactionModalTrigger>

      <NewTransactionModalPortal>
        <NewTransactionModalOverlay />
        <NewTransactionModalContent>
          <Dialog.Title>Nova transação</Dialog.Title>

          <NewTransactionModalClose>
            <X size={24} />
          </NewTransactionModalClose>

          <NewTransactionModalForm onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input type="text" placeholder="Descrição" required {...register("title")} />
            <input type="number" placeholder="Preço" required {...register("amount", { valueAsNumber: true })} />
            <input type="text" placeholder="Categoria" required {...register("category")} />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant="income" value="income">
                      <CircleArrowUp size={24} color="green" />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                      <CircleArrowDown size={24} color="red" />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                );
              }}
            />

            <SubmitButton type="submit" disabled={isSubmitting}>
              Cadastrar
            </SubmitButton>
          </NewTransactionModalForm>
        </NewTransactionModalContent>
      </NewTransactionModalPortal>
    </Dialog.Root>
  );
}
