import IPokemon from "./Pokemon";

interface IPokeApiResponse {
  count: number;
  page: number;
  pageSize: number;
  totalCount: number;
  data: IPokemon[]
}

export const EmptyPokeApiResponse: IPokeApiResponse = {
  count: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  data: []
}

export default IPokeApiResponse;