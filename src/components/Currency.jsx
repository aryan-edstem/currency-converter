import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Currency = () => {
    const [rate, setRate] = useState()
    const [list, setList] = useState()
    const [result,setResult]= useState(0)
    const [unitRate,setUnitRate]=useState(0)
    const [formData, setFormData] = useState({
        amount: 0,
        base: "AED",
        target: "AED",
      });


    useEffect (() =>{
      getData();
    } ,[]);

    const getData=() => {
      axios.get('http://data.fixer.io/api/latest?access_key=d327892acd89d0fb66da8d6a0123ef12')

      .then(response => {
        console.log(response.data);
        setRate(response.data)
        setList(Object.keys(response.data.rates))
      })
    
      .catch(error => {
        console.error('Error:', error);
      });
      
  }

    

    const handleChange = (event) => {
        setResult(0)
        const { name, value} = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUnitRate(1/rate.rates[formData.base] * rate.rates[formData.target]);
        setResult(formData.amount / rate.rates[formData.base] * rate.rates[formData.target]);
    }

    if(rate){
    return(
          <div>
              <h1>Currency Converter</h1>
              <h3>Check live rates, set rate alerts, receive notifications and more.</h3>
              <div  className="container">
                <form onSubmit={handleSubmit}>
                <div className="base-currency">
                <label>
                     <p> From </p>
                      <select
                        name="base"
                        value={formData.base}
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
                  Amount:
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="amount"
                    />
                </label>
                </div>
                <br /> 

                <div className="base-currency">
                  <label>
                      <p>To</p>
                      <select
                        name="target"
                        value={formData.target}
                        onChange={handleChange}
                      >
                      {list.map((item)=>{
                          return(
                          <option value={item}>{item}</option>
                          )
                      })}
                      </select>
                  </label>

                  <label>
                  Amount:
                  <input
                    type="text"
                    name="amount"
                    value={result}
                    onChange={handleChange}
                    className="amount"
                    />
                  </label>
                </div>
                </form>
                <button onClick={handleSubmit}>Calculate</button> 
                <p>Indicative Exchange Rate</p>
                <h2>{unitRate}</h2>
              </div>
            </div>
          )
      }
}

 export default Currency