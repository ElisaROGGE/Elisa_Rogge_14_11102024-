import React, { useState } from "react"
import Select from 'react-select';
import './index.css'

interface SelectEmployeeProps {
    options: [{
        value: string, label: string
    }]
    className?: string
}

const SelectEmployee: React.FC<SelectEmployeeProps> = ({options, className}) => {
    console.log(options, 'options')
    console.log(className, 'className')
    return (
        <div className={className}>
            <Select
                defaultValue={options[0]}
                options={options}
            />
        </div>
    )
}

export default SelectEmployee