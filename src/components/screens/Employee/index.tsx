import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import { Link } from "react-router-dom";

interface EmployeeProps {}

const EmployeeList: React.FC<EmployeeProps> = () => {
    const columns = [
        {
          header: "FirstName",
          accessorKey: "firstName",
        },
        {
          header: "LastName",
          accessorKey: "lastName",
        },
        {
          header: "Date of birth",
          accessorKey: "dateOfBirth",
        },
        {
          header: "Start date",
          accessorKey: "startDate",
        },
        {
          header: "Department",
          accessorKey: "department",
        },
        {
          header: "Street",
          accessorKey: "street",
        },
        {
          header: "City",
          accessorKey: "city",
        },
        {
          header: "State",
          accessorKey: "state",
        },
        {
          header: "Zip code",
          accessorKey: "zipCode",
        },
      ];
    // const table = useReactTable({
    //     data,
    //     columns,
    //     getCoreRowModel: getCoreRowModel(),
    // })
    return (
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <table id="employee-table" className="display"></table>
            <Link to={'/'}>Home</Link>
        </div>
    )
}

export default EmployeeList