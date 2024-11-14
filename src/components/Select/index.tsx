import React from "react"
import Select, { SingleValue } from 'react-select';
import './index.css'

interface OptionType {
    value: string;
    label: string;
  }
  
  interface SelectEmployeeProps {
    options: OptionType[];
    className?: string;
    value?: string;
    onChange?: (selectedOption: SingleValue<OptionType>) => void;
  }

const SelectEmployee: React.FC<SelectEmployeeProps> = ({options, value, onChange, className}) => {
    return (
        <div className={className}>
            <Select
                defaultValue={options[0]}
                value={options.find((option) => option.value === value)}
                onChange={onChange}
                options={options}
            />
        </div>
    )
}

export default SelectEmployee