import { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams, useNavigate} from "react-router-dom"

const API = process.env.REACT_APP_API_URL

function TransactionDetails(){
    const [transaction,setTransaction] = useState([])
    let {index} = useParams()
    let navigate = useNavigate()


    useEffect(() =>{
        axios
        .get(`${API}/transactions/${index}`)
        .then((response) =>{
            setTransaction(response.data)
        })
        .catch(()=> {
            navigate('/not-found')
        })
    },[index,navigate])

    const handleDelete = () => {
        axios
          .delete(`${API}/transactions/${index}`)
          .then(() => {
            navigate(`/transactions`);
          })
          .catch((e) => console.error(e));
      };

    return(
        <article>
            <h2>{transaction.date}</h2>
            <h3>{transaction.itemName}</h3>
            <h3>${transaction.amount}</h3>
            <h4>{transaction.from}</h4>
            <h4>{transaction.category}</h4>
            <div className="naviagation">
                <button>
                    <Link to={'/transactions'}>
                    Back 
                    </Link>
                </button>
                <button>
                    <Link to={`/transactions/${index}/edit`}>
                    Edit
                    </Link>
                </button>
                <button onClick={handleDelete}>
                    Delete
                </button>

            </div>
        </article>
    )

}

export default TransactionDetails