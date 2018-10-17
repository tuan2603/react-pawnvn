import React, {Component} from 'react';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {title} from "../../utils";
import * as questionActions from "../../actions/questionActions";
import './Question.css';
// import './bootstrap.vertical-tabs.css';
// import './tabs.css';
const $ = window.jQuery;

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.questions
        }
        autoBind(this);
    }

    componentDidMount() {
        document.title = `${title} - Câu hỏi`;
        if (this.state.questions.length === 0) {
            this.props.actions.loadQuestion();
            setTimeout(() => {
                this.setState({questions: [...this.props.questions]});
            }, 3000)
        }

        $('.nav-tabs-dropdown').each(function(i, elm) {

            $(elm).text($(elm).next('ul').find('li.active a').text());

        });

        $('.nav-tabs-dropdown').on('click', function(e) {

            e.preventDefault();

            $(e.target).toggleClass('open').next('ul').slideToggle();

        });

        $('#nav-tabs-wrapper a[data-toggle="tab"]').on('click', function(e) {

            e.preventDefault();

            $(e.target).closest('ul').hide().prev('a').removeClass('open').text($(this).text());

        });
    }

    render() {
        return (
            <div className="questions-main">
                <header className="site-header">
                </header><div className="section-padding">
                    <div className="container" style={{minHeight:"600px"}}>
                        <div className="row">
                            <div id="aside-nav-left" className="aside-nav col-sm-3">
                                <a href="#" className="nav-tabs-dropdown btn btn-block btn-primary">Tabs</a>
                                <ul id="nav-tabs-wrapper" className="nav nav-tabs nav-pills nav-stacked well">
                                    <li className="active nav-item" ><a className="nav-link py-xl-4 py-3 px-5 active" href="#vtab1" data-toggle="tab">Tab 1</a></li>
                                    <li className="nav-item"><a className="nav-link py-xl-4 py-3 px-5"  href="#vtab2" data-toggle="tab">Tab 2</a></li>
                                    <li className="nav-item"><a className="nav-link py-xl-4 py-3 px-5"  href="#vtab3" data-toggle="tab">Tab 3</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-9">
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane fade in active" id="vtab1">
                                        <h3>Tab 1</h3>
                                        <p> Mauris imperdiet dignissim ante, in efficitur mauris elementum sed.</p>
                                    </div>
                                    <div role="tabpanel" className="tab-pane fade" id="vtab2">
                                        <h3>Tab 2</h3>
                                        <p> Mauris imperdiet dignissim ante, in efficitur mauris elementum sed. </p>
                                    </div>
                                    <div role="tabpanel" className="tab-pane fade in" id="vtab3">
                                        <h3>Tab 3</h3>
                                        <p>Etiam id pharetra quam. Morbi tristique nunc vel sapien dapibus</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Questions.propTypes = {
    questions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    if (state.questions) {
        return {
            questions: state.questions
        };
    } else {
        return {
            questions: []
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(questionActions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(Questions);
