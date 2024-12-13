import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "./index";

const mockStore = configureStore();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it("renders the form and all fields", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Create Employee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
  });

  it("submits the form with valid data", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/Street/i), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: "Springfield" } });
    fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: "12345" } });

    fireEvent.submit(screen.getByRole("button", { name: /save/i }));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch.mock.calls[0][0].payload).toEqual(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "Springfield",
        zipCode: 12345,
      })
    );
  });

  it("opens the modal on successful submission", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/Street/i), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: "Springfield" } });
    fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: "12345" } });

    fireEvent.submit(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(/Employee created!/i)).toBeInTheDocument();
  });
});
