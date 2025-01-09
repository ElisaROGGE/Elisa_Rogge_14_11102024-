import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import EmployeeList from "./index";
import "@testing-library/jest-dom";
import { Store } from "@reduxjs/toolkit";

const mockStore = configureStore([]);
const mockData = [
  {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    startDate: "2020-01-01",
    department: "HR",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: "1985-05-15",
    startDate: "2019-03-10",
    department: "Finance",
    street: "456 Elm St",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
  },
];

describe("EmployeeList Component", () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      employees: mockData,
    });
  });

  test("renders the table with employee data", () => {
    render(
      <Provider store={store}>
        <Router>
          <EmployeeList />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Current Employees")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
  });

  test("filters employees based on search query", () => {
    render(
      <Provider store={store}>
        <Router>
          <EmployeeList />
        </Router>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");
    fireEvent.change(searchInput, { target: { value: "Jane" } });

    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  test("displays 'No matching records found' for unmatched search queries", async () => {
    render(
      <Provider store={store}>
        <Router>
          <EmployeeList />
        </Router>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");
    fireEvent.change(searchInput, { target: { value: "Nonexistent" } });

    await waitFor(() =>
      expect(screen.getByText("No matching records found")).toBeInTheDocument()
    );
  });

  test("handles pagination correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <EmployeeList />
        </Router>
      </Provider>
    );

    const nextButton = screen.getByText("Next");
    const prevButton = screen.getByText("Previous");

    expect(nextButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  test("renders with no data available", () => {
    store = mockStore({ employees: [] });

    render(
      <Provider store={store}>
        <Router>
          <EmployeeList />
        </Router>
      </Provider>
    );

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});
