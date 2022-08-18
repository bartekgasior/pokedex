import styled from 'styled-components';

const SearchFormStyles = styled.form`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding: 0 .5rem;

  input {
    height: 2rem;
  }

  .search-box-btn {
      color: #FFF;
      border: 1px solid #FFF;
      
      &:hover {
        color: var(--primary-bg-color);
        background-color: #FFF;
      }

      &:disabled {
        opacity: .5;
      }
    }

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: end;
    align-items: center;
    gap: 1rem;
  }
`

export default SearchFormStyles;