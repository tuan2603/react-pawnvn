import React from 'react';
import {Fa} from 'mdbreact';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import * as catsActions from '../../actions/catsActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as config from "../../utils";
import "./CategoryArea.css";


class CategoryArea extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            checkBoxCats: this.props.checkBoxCats,
        };
        autoBind(this);
    }

    componentWillMount() {
        if (this.props.checkBoxCats.length === 0) {
            this.props.actionsCat.loadCats();
        }
    }

    componentDidMount() {
        setTimeout(() => {
            return this.setState({checkBoxCats: this.props.checkBoxCats});
        }, 3000);
    }

    render() {
        let {checkBoxCats} = this.state;
        let $content;
        if (checkBoxCats.length === 0) {
            $content =
                (<div className="container-fluid text-center">
                    <div className="">
                        <p><Fa icon="spinner" size="5x" spin/></p>
                    </div>
                </div>);
        } else {
            $content =
                (<div >
                        {checkBoxCats.map((cat, index) => (
                            <div className="col-xs-6 col-sm-3 col-md-2" key={cat._id}>
                                <article className="post-single">
                                    <figure className="post-media">
                                        <img src={`${config.apiUrl}/uploads/categories/${cat.icon}`} alt={cat.label}/>
                                    </figure>
                                    <div className="post-body">
                                        <h5 className="dark-color">{cat.label}</h5>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                );
        }


        return (
            <div className="category-main">
            <section className=" section-padding gallery-area" id="category_page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="page-title text-center">
                                <h5 className="title">Pawnvietnam</h5>
                                <h3 className="dark-color">Chấp Nhận Các Gói Tài SảnVay</h3>
                                <div className="space-60"> </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            {$content}
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }
}

CategoryArea.propTypes = {
    // cats: PropTypes.array.isRequired,
    checkBoxCats: PropTypes.array.isRequired,
    actionsCat: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const stateCats = Object.assign([], state.cats);
    return {checkBoxCats: stateCats};
}

function mapDispatchToProps(dispatch) {
    return {
        actionsCat: bindActionCreators(catsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryArea);
