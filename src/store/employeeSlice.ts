import { createSlice } from '@reduxjs/toolkit';

export interface Employee {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startDate: Date;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface RootState {
  employees: Employee[];
}

const initialState: Employee[] = [];

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
