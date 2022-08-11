import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
// import { rootReducer } from "../../redux/store";
// import { getToken } from "../../API/getInfo";

import App from "../../App";
import Store from "../../redux/store"
import Login from "../../pages/Login";


describe('Testes na página de LOGIN', () => {
  it('Testa se o componente é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const nameLabel = screen.getByText(/usuário/i)
    const emailLabel = screen.getByText(/email/i)
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();

    const nameInput = screen.getByTestId("input-player-name")
    const emailInput = screen.getByTestId("input-gravatar-email")
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se os buttons são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', {
      name: /play/i,
    })
  
    const settingsButton = screen.getByRole('button', {
      name: /settings/i,
    })
  
    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  
    expect(playButton).toBeDisabled();
    expect(settingsButton).not.toBeDisabled();
  });

  it('Testa a funcionalidade dos inputs', () => {
    renderWithRouterAndRedux(<App />);
    
    const nameInput = screen.getByTestId("input-player-name")
    const emailInput = screen.getByTestId("input-gravatar-email")
    const playButton = screen.getByRole('button', {
      name: /play/i,
    })

    userEvent.type(nameInput, '');
    userEvent.type(emailInput, 'email');

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, 'Teste');
    userEvent.type(emailInput, 'email@teste');

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, 'Teste');
    userEvent.type(emailInput, 'email@teste.com');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);
  });

  it('Testa se o botão de CONFIG funciona', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', {
      name: /settings/i,
    })

    userEvent.click(settingsButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/config')
  });

  it('Testa a funcionalidade dos inputs', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const nameInput = screen.getByTestId("input-player-name")
    const emailInput = screen.getByTestId("input-gravatar-email")
    const playButton = screen.getByRole('button', {
      name: /play/i,
    })

    userEvent.type(nameInput, 'Teste');
    userEvent.type(emailInput, 'email@teste.com');

    userEvent.click(playButton);

    await new Promise((r) => setTimeout(r, 5000))

    const { pathname } = history.location;

    expect(pathname).toBe('/play')
  });
});