import { Link } from "react-router-dom";
import logo from "../icon_and_graphics_9.gif"


export default function NavBar(){
    
    return(
        <nav>
            
            <img src={logo} alt="logo" height="100px" >
            </img>
            
            <h1>
                <Link to="/transactions"> Transactions</Link>
            </h1>
           
            <h1>
                <Link to="/transactions/new"> New Transaction</Link>
            </h1>
        </nav>
    )
}