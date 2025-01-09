import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.css'
import SelectEmployee from "../../Select";
import { states } from "../../../utils/states";
import { useDispatch } from "react-redux";
import { Employee, setEmployee } from "../../../store/employeeSlice";
import ValidationModal  from "oc-modal-plugin";

const Home: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Employee>();
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch();

  const submitHandler: SubmitHandler<Employee> = (data: Employee) => {
    try{
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth.toLocaleDateString("fr-FR"),
        startDate: data.startDate.toLocaleDateString("fr-FR"),
      };
    
      dispatch(setEmployee(formattedData));
      setOpenModal(true)
    }
    catch(error){
      console.log(error)
    }
  };

  const closeModal = () => {
    setOpenModal(false)
  }
  

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

  return (
    <>
    <ValidationModal title="Success !" children="Employee created!" buttonText="Close" isOpen={openModal} closeModal={closeModal} />
    <div>
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
            {...register("firstName", { required: "First name is required" })} 
          />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}


          <label htmlFor="last-name">Last Name</label>
          <input 
            type="text" 
            id="last-name" 
            {...register("lastName", { required: "Last name is required" })} 
          />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}

          <label htmlFor="date-of-birth">Date of Birth</label>
          <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                required: "Date of birth is required",
                validate: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age = today.getFullYear() - birthDate.getFullYear();
                  const isOldEnough =
                    age > 18 || (age === 18 && today >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)));
                  return isOldEnough || "You must be at least 18 years old";
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <DatePicker
                    selected={value}
                    onChange={(date: Date | null) => onChange(date)} 
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    aria-labelledby="date-of-birth"
                  />
                  {error && <p className="error-message">{error.message}</p>}
                </>
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
                onChange={(date: Date | null) => onChange(date)} 
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
              {...register("street", { required: "Street is required" })} 
            />
            {errors.street && <p className="error-message">{errors.street.message}</p>}

            <label htmlFor="city">City</label>
            <input 
              id="city" 
              type="text" 
              {...register("city", { required: "City is required" })} 
            />
            {errors.city && <p className="error-message">{errors.city.message}</p>}

            <label htmlFor="state">State</label>
            <Controller
              control={control}
              name="state"
              defaultValue={newStates[0].value}
              render={({ field: { onChange, value } }) => (
                <SelectEmployee 
                  options={newStates} 
                  value={value} 
                  onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : null)}
                />
              )}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input 
              id="zip-code" 
              type="number" 
              {...register("zipCode", { 
                required: "Zip code is required", 
                minLength: { value: 5, message: "Zip code must be 5 digits" } 
              })} 
            />
            {errors.zipCode && <p className="error-message">{errors.zipCode.message}</p>}
          </fieldset>

          <label htmlFor="department">Department</label>
          <Controller
            control={control}
            name="department"
            defaultValue={options[0].value}
            render={({ field: { onChange, value } }) => (
              <SelectEmployee 
                options={options} 
                value={value} 
                onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : null)}
                className="select-department"
              />
            )}
          />

          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Home;
