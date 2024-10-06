import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { SearchFormContainer } from "./styles";

// Por que um componente renderiza?
// - Hooks changed (mudou estado, contexto, reducer)
// - Props changed (mudou as props)
// - Parent component rerendered (componente pai renderizou)
// Qual o fluxo de renderização?
// 1. O React recria o HTML da interface daquele componente
// 2. Compara a versão do HTML recriada com a versão anterior
// 3. Se mudou alguma coisa, ele redenriza o HTML
// 4. Se nada mudou, ele não redenriza o HTML
//
// MEMO:
// 0. Hooks changed, Props changed (deep comparison)
// 0.1: Comparar a versão anterior dos hooks e props
// 0.2 Se mudou algo, ele vai permitir a renderização

//Porem em muitos casos, a gente não precisa de uma deep comparison por que acaba sendo demorado se fizer em componentes muito pequenos
const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);

    console.log(data);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações" {...register("query")} />
      <button type="submit" disabled={isSubmitting}>
        Buscar
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
