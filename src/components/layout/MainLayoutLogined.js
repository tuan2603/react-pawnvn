import React, {Component} from 'react';
import { MainMenu } from  '../../components/navbar2';
import autoBind from "react-autobind";
import {Redirect} from 'react-router-dom';
import {TOKEN} from '../../constants/Users';
import {getFromSession} from '../../utils';
import {Footers} from "../footer";
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
            <div>
                <MainMenu />
                <main>
                    {children}
                </main>
                <Footers/>
            </div>
        );
    }
}

export default (MainLayoutLogined);
