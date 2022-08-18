import { Card } from "@mui/material";
import { TPokemonType } from "interfaces/PokemonType";
import styled from "styled-components";

export const typesColors = {
  Colorless: "#A8A77A",
  Darkness: "#705746",
  Dragon: "#6F35FC",
  Fairy: "#D685AD",
  Fighting: "#C22E28",
  Fire: "#EE8130",
  Grass: "#7AC74C",
  Lightning: "#F7D02C",
  Metal: "#B7B7CE",
  Psychic: "#F95587",
  Water: "#6390F0",
}

interface IProps {
  type: TPokemonType,
}

const PokemonCardStyles = styled(Card) <IProps>`
  background-color: ${({ type }) => typesColors[type]};
  padding: 1rem .25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  line-height: 1rem;
  position: relative;
  min-height: 275px;
  height: auto;
  min-width: 150px;
  transition: all .25s ease-in;
  
  > img {
    max-width: 100%;
    height: 20rem;
  }

  &:hover {
    box-shadow: 0 0 0.5rem 0.5rem ${({ type }) => typesColors[type]};
    border: 1px solid #000;
  }

  .pokemon-idx {
    position: absolute;
    right: 0;
    top: 0;
    font-weight: bold;
  }

  .pokemon-fight-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: .75rem;
    line-height: .75rem;
    color: #000;
    border-color: #000;
    padding: 0;

    &:hover{
      color: #FFF;
      background-color: #000;
      font-weight: bold;
    }
  }

  .pokemon-fight-btn.poke-selected-to-fight {
    color: #FFF;
    background-color: #000;
    font-weight: bold;
  }

  .resize-pokemon-card { 
    position: absolute;
    right: -0.5rem;
    bottom: -0.25rem;
  }

  .pokemon-details {
    text-align: start;
    height: 0;
    width: calc(100% - 2rem);
    transition: all .25s ease-in;
    visibility: hidden;
    background-color: var(--primary-bg-color);
    border-radius: .25rem;
    color: #FFF;

    .pokemon-details-types {
      display: flex;
      justify-content: space-around;
      color: var(--primary-bg-color);
    }

    table {
      border-spacing: 0;
      border-collapse: separate;
      width: 100%;
      margin-block: .5rem;
      font-size: .875rem;

      tr {
        &:hover{ 
          background-color: #FFF;
          color: #000;

          td {
          border: 1px solid #000;
          }
        }
      }

      td {
        border: 1px solid #FFF;
        padding: .5rem 0.25rem;
        word-break: break-all;

        &:first-child{
          word-break: unset;
        }

        &:last-child {
          width: 100%;
        }
      }
    }
  }

  .pokemon-details.pokemon-details-opened {
    height: 9rem;
    visibility: visible;
    overflow: hidden;
    margin-top: .5rem;
    padding: .5rem;

  }


`

export default PokemonCardStyles;