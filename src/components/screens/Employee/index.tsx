import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './table.css'

interface EmployeeProps {}

const EmployeeList: React.FC<EmployeeProps> = () => {
  const data = useSelector((state) => state?.employees);
  
  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Date of Birth", accessorKey: "dateOfBirth" },
    { header: "Start Date", accessorKey: "startDate" },
    { header: "Department", accessorKey: "department" },
    { header: "Street", accessorKey: "street" },
    { header: "City", accessorKey: "city" },
    { header: "State", accessorKey: "state" },
    { header: "Zip Code", accessorKey: "zipCode" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table key={data.length} id="employee-table" className="display">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{header.column.columnDef.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{cell.getValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeeList;
