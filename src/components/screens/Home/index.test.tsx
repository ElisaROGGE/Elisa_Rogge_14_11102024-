import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Home from "./index";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

const mockStore = configureStore([]);
jest.mock("oc-modal-plugin", () => () => <div>Mocked Modal</div>);

describe("Home Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employee: {
        employees: [],
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders the form correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Create Employee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });

    const datePicker = screen.getByText(/Date of Birth/i);
    userEvent.click(datePicker); 
    userEvent.type(datePicker, "01/01/2000");

    fireEvent.change(screen.getByLabelText(/Street/i), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByLabelText(/Zip Code/i), {
      target: { value: "10001" },
    });

    fireEvent.click(screen.getByText("Save"));
    

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it("shows the modal after form submission", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText(/Mocked Modal/i)).toBeInTheDocument();
    });
  });
});
