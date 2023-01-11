import { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction"
import TransAmount from "./TransAmount";


const API = process.env.REACT_APP_API_URL;

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    

useEffect(()=>{
  axios.get(`${API}/transactions`)
  .then((res)=>{setTransactions(res.data)})
  .catch(error=> console.log(error))
},[])

const amountArray= []


const [transTotal, setTransTotal] = useState(0)


useEffect(() => {
    var total = 0
    
    if (amountArray.length>0){
    total = amountArray.reduce((a,b)=>{
        return a + b
    })
    }
    setTransTotal(Math.round(total*100)/100)
    // console.log(transTotal)
    // console.log(amountArray)
},[amountArray])

  return (
    <div className="transactions">
       Bank Total:$ <TransAmount transTotal={transTotal}/>
      <section>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Name</th>
              <th>Amount</th>
              <th>From</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
                // console.log(transaction.category)
                if (transaction.category === "charge"){
                    amountArray.push(transaction.amount * -1)
                }else {amountArray.push(transaction.amount)}
              return <Transaction key={index} transaction={transaction} index={index} />;
            })}
          </tbody>
        </table>
      </section>

    </div>
  );
}

export default Transactions;
