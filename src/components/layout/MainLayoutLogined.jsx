import React, {Component} from 'react';
import { NavbarTop } from  '../../components/navbar';
import autoBind from "react-autobind";
import {Redirect} from 'react-router-dom';
import {TOKEN} from '../../constants/Users';
import {getFromSession} from '../../utils';
class MainLayoutLogined extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
        }
        autoBind(this);
    }
    componentWillMount(){
        if(getFromSession(TOKEN) === null )  {
            this.setState({
                redirectToReferrer: true,
            });
        }
    }
    render() {
        const {children} = this.props;
        const {redirectToReferrer} = this.state;
        if (redirectToReferrer) {
            return <Redirect to={`/signin`}/>
        }
        return (
            <div className="flyout">
                <NavbarTop />
                <main style={{marginTop:"4em"}}>
                    {children}
                </main>
            </div>
        );
    }
}

export default (MainLayoutLogined);
