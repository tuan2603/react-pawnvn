import React, {Component} from 'react';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {title} from "../../utils";

class About extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        document.title = `${title} - Giới thiệu`
    }

    render() {
        let {about} = this.props;
        return (
            <div>
                <header className="site-header">

                </header>
                < div className="section-padding">
                    < div
                        className="container">
                        < div
                            className="row">
                            < div
                                className="col-xs-12">
                                < article className="post-single">
                                    <div className="post-body">
                                        <div id="contents" dangerouslySetInnerHTML={{__html: about.content}}/>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

About.propTypes = {
    about: PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
        if (state.aboutReducer) {
            return {
                about: state.aboutReducer
            };
        } else {
            return {about: {content: ""}}
        }
    }
;

export default connect(mapStateToProps)(About);
