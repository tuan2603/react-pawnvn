import React, {Component} from 'react';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {title} from "../../utils";


class Privacy extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    componentDidMount() {
        document.title = `${title} - Điều khoản sử dụng`
    }


    render() {
        let {terms} = this.props;
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
                        <div id="contents" dangerouslySetInnerHTML={{__html: terms.content}}/>
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

Privacy.propTypes = {
    terms: PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
        if (state.termReducer) {
            return {
                terms: state.termReducer
            };
        } else {
            return {terms: {content: ""}}
        }
    }
;

export default connect(mapStateToProps)(Privacy);
