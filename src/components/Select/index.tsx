import React, { useState } from "react"
import Select from 'react-select';
import './index.css'

interface SelectEmployeeProps {
    options: [{
        value: string, label: string
    }]
}

const SelectEmployee: React.FC<SelectEmployeeProps> = ({options}) => {
    return (
        <div className="select">
            <Select
                defaultValue={options[0]}
                options={options}
            />
        </div>
    )
}

export default SelectEmployee