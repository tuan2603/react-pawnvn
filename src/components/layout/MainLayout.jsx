import React, {Component} from 'react';
import { NavbarTop } from  '../../components/navbar';
class MainLayout extends Component {

    render() {
        let  {children} = this.props;
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

export default (MainLayout);
