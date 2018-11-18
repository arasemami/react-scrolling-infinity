import React,{Component} from 'react';

class Navbar extends Component{

    render(){
        
        return(

                <div>
                    <div className="navbar" >
                       <ul className="menu container "  >
                           <li>Home</li>
                           <li>About</li>
                           <li>Service</li>
                       </ul>
                    </div>
                </div>

        );
    }
}

export default Navbar;