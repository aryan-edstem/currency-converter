import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Currency = () => {
    const [rate, setRate] = useState()
    const [list, setList] = useState()
    const [base,setBase]= useState(0)
    const [formData, setFormData] = useState({
        amount: '',
        from: '',
        to: '',
      });


    useEffect (() => {
        axios.get('http://data.fixer.io/api/latest?access_key=d327892acd89d0fb66da8d6a0123ef12')

        .then(response => {
          console.log(response.data);
          setRate(response.data)
          setList(Object.keys(response.data.rates))
        })
      
        .catch(error => {
          console.error('Error:', error);
        });
        
    },[]);

    const handleChange = (event) => {
        setBase(1)
        const { name, value} = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        setBase(formData.amount / rate.rates[formData.from] * rate.rates[formData.to]);
    }

    if(rate){
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>
          Amount
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <br />  
        <label>
            From
            <select
              name="from"
              value={formData.from}
              onChange={handleChange}
            >
            {list.map((item)=>{
                return(
                <option value={item}>{item}</option>
                )
            })}
            </select>

        </label>
          <br />
        <br />
        <label>
            To
            <select
              name="to"
              value={formData.to}
              onChange={handleChange}
            >
            {list.map((item)=>{
                return(
                <option value={item}>{item}</option>
                )
            })}
            </select>

        </label> <br />
        <br />
        </form>
        <button onClick={handleSubmit}>Calculate</button>
        <br/><br/>
        <h1>{base}</h1>
        </div>
    )
}
}

 export default Currency