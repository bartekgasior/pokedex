import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { store } from "redux/store"
import PokemonCard from "."

const props = {
  idx: 0,
  id: 'poke-id',
  name: 'poke-name',
  hp: '10',
}

describe('pokemon card test', () => {
  it('renders card', () => {
    render(<Provider store={store}><PokemonCard {...props} /></Provider>);

    const idElement = screen.getByText(/#0/i);
    const nameElement = screen.getByText(/poke-name/i);

    expect(idElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  })

  it('renders expanded card', () => {
    render(<Provider store={store}><PokemonCard {...props} /></Provider>);

    const idElement = screen.getByText(/#0/i);
    const sectionElement = screen.getByTestId('pokemon-card-details');

    expect(idElement).toBeInTheDocument();
    expect(sectionElement.className).toContain('pokemon-details')
    expect(sectionElement.className).not.toContain('pokemon-details-opened')

    const resizeButton = screen.getByTestId('resize-btn');
    userEvent.click(resizeButton);
    expect(sectionElement.className).toContain('pokemon-details-opened')
  })

  it('poke selected to fight', () => {
    render(<Provider store={store}><PokemonCard {...props} /></Provider>);

    const fightButton = screen.getByText(/fight/i);
    expect(fightButton).toBeInTheDocument();
    
    userEvent.click(fightButton);
    expect(fightButton.className).toContain('poke-selected-to-fight')
  })
})