import { SearchFormContainer } from "./styles";

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque por transações" />
      <button type="submit" disabled>
        Buscar
      </button>
    </SearchFormContainer>
  );
}
