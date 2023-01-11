import axios from "axios";
import { useState,  } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL

function NewTransactionForm() {

    const navigate = useNavigate();
  
    let { index } = useParams();
  
    const [transaction , setTransaction] = useState({
        itemName: "",
        amount: 0,
        date:"yyyy-MM-dd",
        from:"",
        category:""
    });
  
    const handleTextChange = (event) => {
      setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };
  
    const handleDateChange = (e) => {
    
      setTransaction({ ...transaction, date: e.target.value });
    
      console.log(transaction.date)
    };
  
    const handleSelect= (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
        if(transaction.category=== "charge"){
            setTransaction({...transaction, [transaction.amount]: transaction.amount * -1})
        }  
    };
    // useEffect(() => {
    //   axios
    //   .get(`${API}/transactions/${index}`)
    //   .then(res => setTransaction(res.data))
    //   .catch(err => console.log(err))
    // }, [index]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
      .post(`${API}/transactions`, transaction)
      .then(() => {
        navigate(`/transactions`);
      })
      .catch(err => console.log(err))
    };
  
    const handleDelete = () => {
      axios
        .delete(`${API}/transactions/${index}`)
        .then(() => {
          navigate(`/transactions`);
        })
        .catch((e) => console.error(e));
    };
    return (
      <div className="New">
        <form onSubmit={handleSubmit}>
          <label htmlFor="itemName">Item Name:</label>
          <input
            id="itemName"
            type="text"
            value={transaction.itemName}
            onChange={handleTextChange}
            placeholder="Item Name"
            required
          />
          <label htmlFor="amount">Amount: $</label>
          <input
            id="amount"
            type="number"
            pattern="[0-9]{0,4}.[0-9]{2}"
            value={transaction.amount}
            placeholder="00.00"
            onChange={handleTextChange}
            required
          />
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={transaction.date}
            onChange={handleDateChange}
            
            required
          />
          <label htmlFor="from">From:</label>
          <input
            id="from"
            type="text"
            name="from"
            value={transaction.from}
            onChange={handleTextChange}
            placeholder="Charge from ..."
          />
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={transaction.category}
            onChange={handleSelect}>
                <option value=""></option>
                <option value="charge">Charge</option>
                <option value="income">Income</option>
          </select>
          <br />
  
          <input type="submit" />
        </form>
        
  
        <button onClick={handleDelete}>Delete</button>
  
      </div>
    );
  }
  
  export default NewTransactionForm;
  