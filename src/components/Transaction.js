import { Link } from "react-router-dom";

function Transaction({transaction, index}){
    
    return(
    <tr>
        <td>
        {transaction.date}
        </td>
        <td>
        <Link to={`/transactions/${index}`}>{transaction.itemName}</Link>
        </td>
        <td>
        ${transaction.amount}
        </td>
        <td>
        {transaction.from}
        </td>
        <td>
        {transaction.category}
        </td>
    </tr>
    )
}

export default Transaction