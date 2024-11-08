import { createSlice } from '@reduxjs/toolkit';

export interface RootState {
  employee: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    startDate: string;
    department: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const initialState = {
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    startDate: '',
    department: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.startDate = action.payload.startDate;
      state.department = action.payload.department;
      state.street = action.payload.street;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipCode = action.payload.zipCode;
    },
  }
});

export const { setEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
