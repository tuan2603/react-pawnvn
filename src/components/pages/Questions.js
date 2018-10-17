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
            }, 500)
        }

        setTimeout(() => {
            $('.nav-tabs-dropdown').each(function (i, elm) {

                $(elm).text($(elm).next('ul').find('li.active a').text());

            });

            $('.nav-tabs-dropdown').on('click', function (e) {

                e.preventDefault();

                $(e.target).toggleClass('open').next('ul').slideToggle();

            });

            $('#nav-tabs-wrapper a[data-toggle="tab"]').on('click', function (e) {

                e.preventDefault();

                $(e.target).closest('ul').hide().prev('a').removeClass('open').text($(this).text());

            });
        }, 3000)


    }

    render() {
        let {questions} = this.state;
        let stt =  0, stt2 = 0;
        return (
            <div className="questions-main">
                <header className="questions-header">
                </header>
                <div className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div id="aside-nav-left" className="aside-nav col-md-3">
                                {/*<div className="title-question">Câu hỏi thường gặp</div>*/}
                                <a href="#" className="nav-tabs-dropdown">Câu hỏi thường gặp</a>
                                <ul id="nav-tabs-wrapper" className="nav nav-tabs nav-pills nav-stacked well">
                                    {questions.map((question) => {
                                        if (question.no === 1){
                                            stt++;
                                            if (stt === 1){
                                                return(<li className="active nav-item" key={question._id}><a
                                                    className="nav-link active" href={"#vtab"+stt}
                                                    data-toggle="tab">{question.question_group}</a></li>)
                                            }else{
                                                return(<li className=" nav-item" key={question._id}><a
                                                    className="nav-link" href={"#vtab"+stt}
                                                    data-toggle="tab">{question.question_group}</a></li>)
                                            }
                                        }
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col-md-9 question-content">
                                <div className="tab-content">
                                    {questions.map((question) => {
                                        if (question.no === 1){
                                            stt2++;
                                            if (stt2 === 1){
                                                return (
                                                    <div key={question._id} role="tabpanel" className="tab-pane fade in active" id={"vtab"+stt2}>
                                                        {questions.map((questionc) => {
                                                            if (question.question_group === questionc.question_group ) {
                                                                return (
                                                                    <div key={questionc._id}>
                                                                    <p> {questionc.title_question} </p>
                                                                    {
                                                                        questionc.content_answer.map(answer => {
                                                                            return<p key={answer._id}>{answer.answer}</p>
                                                                        })
                                                                    }
                                                                    </div>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={question._id} role="tabpanel" className="tab-pane fade" id={"vtab"+stt2}>
                                                        {questions.map((questionc) => {
                                                            if (question.question_group === questionc.question_group ) {
                                                                return (
                                                                    <div key={questionc._id}>
                                                                        <p> {questionc.title_question} </p>
                                                                        {
                                                                            questionc.content_answer.map(answer => {
                                                                                return<p key={answer._id}>{answer.answer}</p>
                                                                            })
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                )
                                            }
                                        }
                                    })
                                    }
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
