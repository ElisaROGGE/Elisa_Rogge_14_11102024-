import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.css'
import SelectEmployee from "../../Select";
import { states } from "../../../utils/states";
import { useSelector } from "react-redux";
import { setEmployee } from "../../../store/employeeSlice";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { register, handleSubmit, control } = useForm();
  const [employeeCreated, setEmployeeCreated] = useState(false);
  const employee = useSelector((state) => state?.employees);

  const submitHandler = (data) => {
    console.log(data);
    setEmployee(data)
    setEmployeeCreated(true);
  };

  const options = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
  ];

  const newStates = states.map((state) => {
    return {
      label: state.name,
      value: state.abbreviation
    }
    
  })
  console.log(employee, 'employee')

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to={'/employee-list'}>View Current Employees</Link>
        <h2>Create Employee</h2>
        <form 
          id="create-employee" 
          className="create-employee" 
          onSubmit={handleSubmit(submitHandler)}
        >
          <label htmlFor="first-name">First Name</label>
          <input 
            type="text" 
            id="first-name" 
            {...register("firstName", { required: true })} 
          />

          <label htmlFor="last-name">Last Name</label>
          <input 
            type="text" 
            id="last-name" 
            {...register("lastName", { required: true })} 
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <Controller
            control={control}
            name="dateOfBirth"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={(date) => onChange(date)} 
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            )}
          />

          <label htmlFor="start-date">Start Date</label>
          <Controller
            control={control}
            name="startDate"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={(date) => onChange(date)} 
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            )}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input 
              id="street" 
              type="text" 
              {...register("street", { required: true })} 
            />

            <label htmlFor="city">City</label>
            <input 
              id="city" 
              type="text" 
              {...register("city", { required: true })} 
            />

            <label htmlFor="state">State</label>
            <Controller
              control={control}
              name="state"
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <SelectEmployee 
                  options={newStates} 
                  value={value} 
                  onChange={onChange} 
                />
              )}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input 
              id="zip-code" 
              type="number" 
              {...register("zipCode", { required: true })} 
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Controller
            control={control}
            name="department"
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <SelectEmployee 
                options={options} 
                value={value} 
                onChange={onChange} 
                className="select-department"
              />
            )}
          />

          <button type="submit" className="save-btn">Save</button>
        </form>

        {employeeCreated && (
          <div id="confirmation" className="modal">
            Employee Created!
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
