import React from 'react';
import {
    NavLink
} from "react-router-dom";
import { Container, Col, Row, Fa, Jumbotron } from 'mdbreact';
import autoBind from "react-autobind";
import { connect } from 'react-redux';
import * as actions from '../../actions/catsActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { CheckInput } from '../../components';
import * as config from "../../utils";

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            saving: false,
            cats: [],
        };
        autoBind(this);
    }

    componentWillMount() {
        if (this.props.cats[0]._id === '') {
            this.props.actions.loadCats();
        }
    }

    updateCatState(event) {
        const field = event.target.name;
        console.log(field);
    }

    render() {
        let { cats, userprops } = this.props;
        if (!cats || !userprops) {
            return (<div>not found</div>);
        }
        let { categories } = this.props.userprops;
        let { isEdit, saving } = this.state;
        const total = cats.length
        let complete = [];
        categories.map(cate => {
            cats.map(catc => {
                if(cate._id === catc._id){
                    complete.push(catc);
                }
            });
        });



        const incomplete = cats.filter((cat) => cat._id !== categories._id);
        console.log("complete", complete);
        console.log("incomplete", incomplete);
        let $button = (<NavLink
            to={"/contact"}
            className="btn btn-lg btn-primary btn-block btn-rounded" id="mySubmit"
            type="submit">Tiếp tục</NavLink>);
        if (isEdit) {
            $button = (<input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary btn-block btn-rounded"
                onClick={this.handleSubmit} />)
        }
        return (
            <div >
                <Container>
                    <Row>
                        <Col md="8" className="mx-auto mt-4 profile-doccument">
                            <Jumbotron>
                                <h3 className="text-center mb-3">Danh mục thế chấp</h3>
                                <Row>
                                    {cats.map((cat, index) => (
                                        <Col md="4" className="text-center home-feature-box" key={cat._id}>
                                            <div className="form-label-group">
                                                <CheckInput
                                                    name={cat.value}
                                                    value={cat.value}
                                                    label={cat.label}
                                                    onChange={this.updateCatState}
                                                />
                                                <img className="img-fluid" style={{ maxHeight: "200px" }}
                                                    src={`${config.apiUrl}/uploads/categories/${cat.icon}`} alt={cat.label} />

                                            </div>
                                            <span>{cat.label}</span>
                                        </Col>
                                    ))}
                                </Row>
                            </Jumbotron>
                            <div className="white">
                                {/* Total: {total} , Complete: {complete} , Incomplete: {incomplete} */}
                            </div>
                        </Col>
                    </Row>
                    <div id="mybutton">
                        {$button}
                    </div>
                </Container>
            </div>
        );
    }
}

Categories.propTypes = {
    cats: PropTypes.array.isRequired,
    userprops: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    if (state.cats) {
        return {
            cats: state.cats,
            userprops: state.userReducers
        };
    } else {
        return {
            cats: [{ _id: '', value: '', label: '', icon: '' }],
            userprops: { categories: [] },
        }
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
