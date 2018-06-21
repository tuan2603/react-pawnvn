import React from 'react';
import "./Footer.css"

class FooterMain extends React.Component {
  render(){
    return(
        <div className="main-signup">
            <div className="form-signin">
                <p className="mt-5 mb-3 text-muted text-center"> &copy; {(new Date().getFullYear())} Copyright: </p>
            </div>

        </div>
    );
  }
}

export default FooterMain;
