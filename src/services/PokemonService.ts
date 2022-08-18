import axios from 'axios';
import IPokeApiResponse, { EmptyPokeApiResponse } from 'interfaces/PokeApiResponse';

export const URL = 'https://api.pokemontcg.io/v2';

export const getAll = async (pageNumber: number, pageSize: number): Promise<IPokeApiResponse> => {
    try {
        const { data: response } = await axios.get(`${URL}/cards?page=${pageNumber};pageSize=${pageSize}`);
        return response;
    } catch (err) {
        console.log(err);
        return EmptyPokeApiResponse;
    }
}

export const getByQuery = async (search: string, types: string[], pageNumber: number, pageSize: number): Promise<IPokeApiResponse> => {
    try {
        const nameQuery = search !== '' ? `name:*${search}*` : '';
        const typesQuery = types.length > 0 ? types.reduce((acc, type) => acc += `types:${type} `, '') : ''

        const { data: response } = await axios.get(`${URL}/cards?page=${pageNumber};pageSize=${pageSize};q=${nameQuery}${typesQuery}`);
        return response;
    } catch (err) {
        console.log(err);
        return EmptyPokeApiResponse;
    }
}