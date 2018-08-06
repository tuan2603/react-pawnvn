import React, {Component} from 'react';
import {Container, Row, Col} from 'mdbreact';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import $ from 'jquery';

class About extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    unescapeHTML(html) {
        $('#contents').html(html);
    }

    render() {
        let {about} = this.props;
        return (
            <Container className="privacy">
                <Row>
                    <Col md="10" className="mx-auto mt-4">
                        {this.unescapeHTML(about.content)}
                        <div id="contents">
                        </div>
                    </Col>
                </Row>
            </Container>
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
