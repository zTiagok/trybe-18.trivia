import React from "react";

import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { rootReducer } from "../../redux/store";
import { getToken } from "../../API/getInfo";

import Login from "../../pages/Login";
import userEvent from "@testing-library/user-event";

describe('Testes na página de LOGIN', () => {
  it('Testa se os inputs estão na página', async () => {
    renderWithRouterAndRedux(<Login />, rootReducer)

    const nameInput = screen.getByLabelText(/usuário:/i)
    const emailInput = screen.getByLabelText(/email:/i)

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    const playButton = screen.getByRole('button', {
      name: /play/i,
    })

    const settingsButton = screen.getByRole('button', {
      name: /settings/i,
    })

    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, '');
    userEvent.type(emailInput, 'email');

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, 'Algum nome');
    userEvent.type(emailInput, 'algum@email.com');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    const response = await getToken();

    expect(response.response_code).toBe(0);
  });
})