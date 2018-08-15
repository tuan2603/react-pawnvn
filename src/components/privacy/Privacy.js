import React, {Component} from 'react';
import {Container, Row, Col} from 'mdbreact';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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
            <Container className="privacy">
                <Row>
                    <Col md="10" className="mx-auto mt-4">
                        <div id="contents" dangerouslySetInnerHTML={{__html: terms.content}}/>
                    </Col>
                </Row>
            </Container>
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
