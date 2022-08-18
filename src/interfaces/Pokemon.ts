import ICardImage from "./CardImage";
import IPokemonAbility from "./PokemonAbility";
import IPokemonAttack from "./PokemonAttack";
import { TPokemonType } from "./PokemonType";
import IPokemonWeakness from "./PokemonWeakness";

export default interface IPokemon {
    id: string;
    abilities?: IPokemonAbility[];
    artist?: string;
    attacks?: IPokemonAttack[];
    convertedRetreatCost?: number;
    evolvesFrom?: string;
    evolvesTo?: string[];
    flavorText?: string;
    hp?: string;
    images?: ICardImage;
    name: string;
    nationalPokedexNumbers?: number[];
    number?: string;
    rarity?: string;
    retreatCost?: string[];
    subtypes?: string[];
    supertype?: string;
    types: TPokemonType[];
    weaknesses?: IPokemonWeakness[];
}