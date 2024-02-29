import CardOne from '../card/CardOne';
import React, { useState } from 'react';
import './filter.css';




function Filter({optionSelected}) {

    //    const [isLogged, setIsLogged] = useState(true);
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        optionSelected(event.target.value);
    };


    return (
        <>

            <div className="styleFilter">
                <div className='radioB'>                    
                    <input type="radio" id="option1" name="options" value="option1" checked={selectedOption === "option1"} onChange={handleOptionChange}/>
                    <label htmlFor="option1">Todos los productos</label>
                </div>
                <div className='radioB'>                    
                    <input type="radio" id="option2" name="options" value="option2" checked={selectedOption === "option2"} onChange={handleOptionChange} />
                    <label htmlFor="option2">De la Huerta a la Mesa</label>
                </div>
                <div className='radioB'>                    
                    <input type="radio" id="option3" name="options" value="option3" checked={selectedOption === "option3"} onChange={handleOptionChange} />
                    <label htmlFor="option3">Elaborados</label>
                </div>
                <div className='radioB'>                    
                    <input type="radio" id="option4" name="options" value="option4" checked={selectedOption === "option4"} onChange={handleOptionChange} />
                    <label htmlFor="option4">Artesanía Local</label>
                </div>
            </div>

        </>
    )
}

export default Filter;