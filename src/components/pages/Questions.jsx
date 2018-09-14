import React, {Component} from 'react';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {title} from "../../utils";
import * as questionActions from "../../actions/questionActions";
import './Question.css';
import {Fa} from "mdbreact";

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
    }

    render() {
        let {questions} = this.state;
        if (questions.length === 0) {
            return (
                <div className="questions-main">
                    <header className="site-header">
                    </header>
                    <div className="section-padding">
                        <div className="container">
                            <div className="row">
                                <div
                                    className="col-xs-12">
                                    <article className="post-single">
                                        <div className="post-body">
                                            <div className="container-fluid text-center">
                                                <div className="">
                                                    <p><Fa icon="spinner" size="5x" spin/></p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="questions-main">
                <header className="site-header">
                </header>
                <div className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-xs-12">
                                <article className="post-single">
                                    <div className="post-body">
                                        <ol>
                                            {questions.map((question, i) => {
                                                return <li key={question._id}>
                                                    {
                                                        question.no === 1 &&
                                                        <div className="list1">
                                                            <div className="icon icon-four-point"></div>
                                                            <div className="list-item">{question.question_group}</div>
                                                        </div>

                                                    }
                                                    <span>{question.no}.</span>
                                                    <p> {question.title_question} </p>
                                                    <ul>
                                                        {
                                                            question.content_answer.map((answer, i) => {
                                                                return <li key={answer._id}><p>{answer.answer}</p></li>
                                                            })
                                                        }
                                                    </ul>
                                                </li>
                                            })}
                                        </ol>
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
