// components/Dropdown.js

import { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.label : 'Select an option'}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option) => (
                        <li key={option.value} onClick={() => handleSelect(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            <style jsx>{`
                .dropdown {
                    position: relative;
                    display: inline-block;
                }
                .dropdown-toggle {
                    background-color: #ffffff;
                    border: 1px solid #cccccc;
                    padding: 8px 16px;
                    cursor: pointer;
                }
                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background-color: #ffffff;
                    border: 1px solid #cccccc;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }
                .dropdown-menu li {
                    padding: 8px 16px;
                    cursor: pointer;
                }
                .dropdown-menu li:hover {
                    background-color: #f0f0f0;
                }
            `}</style>
        </div>
    );
};

export default Dropdown;
