import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import PokemonCreate from '../../../client/src/Views/PokemonCreate/PokemonCreate.jsx';

describe('Pokemon Create component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PokemonCreate />);
  });
  it('El form debe tener un label que diga: "Name:"', () => {
      const { container } = render(<PokemonCreate />)
      const element = container.querySelectorAll('label')[0]
      expect(element.innerHTML).toBe('Name:');
  });

  it('El form debe tener un label que diga: "Image:"', () => {
    const { container } = render(<PokemonCreate />)
    const element = container.querySelectorAll('label')[1]
    expect(element.innerHTML).toBe('Image:');
  });

  it('El form debe tener un input con name "name" y type "text"', () => {
    const { container } = render(<PokemonCreate />)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('name');
  });

  it('El form debe tener un input con name "hp" y type "number"', () => {
    const { container } = render(<PokemonCreate />)
    const element = container.querySelectorAll('input')[2]
    expect(element.type).toBe('number');
    expect(element.name).toBe('hp');
  });
});
