import React from "react";
import { Link } from "react-router-dom";

interface EmployeeProps {}

const EmployeeList: React.FC<EmployeeProps> = () => {
    return (
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <table id="employee-table" className="display"></table>
            <Link to={'/'}>Home</Link>
        </div>
    )
}

export default EmployeeList