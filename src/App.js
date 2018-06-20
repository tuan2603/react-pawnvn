import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import NavbarCus from './Componet/Navbar/Navbar';
//import FooterMain from './Componet/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/mdb.css';
import './App.css';
import { setupTimeOut} from './utils/storage';


class App extends Component {
        componentWillMount() {
         setupTimeOut();
     }

    render() {
       return (
            <Router>
                <div className="flyout">
                    <NavbarCus />
                    <main style={{marginTop:"4em"}} >
                        <Routes onChangeLogin={this.onChangeLogin} />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
