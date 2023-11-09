import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './components/App';

test('displays weather information for valid city name', async () => {
    render(<App />);
    const cityInput = screen.getByPlaceholderText('Enter city');
    const searchButton = screen.getByText("Search city");

    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.click(searchButton);

    const current_date = new Date().toLocaleDateString();

    await waitFor(() => screen.getByText(`Weather in New York (${current_date})`));

  expect(screen.getByText(`Weather in New York (${current_date})`)).toBeInTheDocument();
});

test('displays error message for invalid city name', async () => {
    render(<App />);
    const cityInput = screen.getByPlaceholderText('Enter city');
    const searchButton = screen.getByText("Search city");

    fireEvent.change(cityInput, { target: { value: 'Invalid City' } });
    fireEvent.click(searchButton);

    await waitFor(() => expect(screen.getByText("We don't have Invalid City in the database")).toBeInTheDocument());
});