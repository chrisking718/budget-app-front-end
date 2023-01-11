import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL

function EditTransactionForm() {

    const navigate = useNavigate();
  
    let { index } = useParams();
  
    const [transaction , setTransaction] = useState({
        itemName: "",
        amount: 0,
        date:"0000-00-00",
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
      
    useEffect(() => {
      axios
      .get(`${API}/transactions/${index}`)
      .then(res => setTransaction(res.data))
      .catch(err => console.log(err))
    }, [index]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
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
      <div className="Edit">
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
            type="text"
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
          {/* <textarea
            id="category"
            type="text"
            name="category"
            value={transaction.category}
            placeholder="Enter your post here..."
            onChange={handleTextChange}
          /> */}
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
        <Link to={`/transactions/${index}`}>
          <button>Back</button>
        </Link>
  
        <button onClick={handleDelete}>Delete</button>
  
      </div>
    );
  }
  
  export default EditTransactionForm;
  