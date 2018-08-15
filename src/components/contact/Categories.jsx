import React from 'react';
import {
    NavLink
} from "react-router-dom";
import {Container, Col, Row,  Jumbotron, Fa} from 'mdbreact';
import autoBind from "react-autobind";
import {connect} from 'react-redux';
import * as catsActions from '../../actions/catsActions';
import * as userActions from '../../actions/userActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {CheckInput} from '../../components';
import * as config from "../../utils";
import {title} from "../../utils";


class Categories extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false,
            saving: false,
            user: this.props.userprops,
            checkBoxCats: this.props.checkBoxCats,
            // cats: this.props.cats,
        };
        autoBind(this);
    }

    componentWillMount() {
        if (this.props.checkBoxCats.length === 0) {
            this.props.actionsCat.loadCats();
        }
    }

    componentDidMount() {

        setTimeout(()=>{
            return this.setState({ user: this.props.userprops,  checkBoxCats: this.props.checkBoxCats});
        },3000);

            document.title = `${title} - Gói tài sản vay`
        }

    updateCatState(event) {
        const {checkBoxCats, user} = this.state;
        const catID = event.target.value;
        const cat = checkBoxCats.filter(cat => cat._id === catID)[0];
        const checked = !cat.checked;
        cat['checked'] = !cat.checked;
        if (checked) {
            user.categories.push(cat);
        } else {
            user.categories.splice(user.categories.indexOf(cat.id));
        }
        this.setState({user, isEdit: true, saving: false});

    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ saving: true });
        let { user } = this.state;
        let {actionsUser} = this.props;

        if (!user._id) {
            this.setState({ saving: false });
            return;
        }


        let obj = {};
        obj = Object.assign({},user);
        obj._id = undefined;
        obj.id = user._id;
        console.log(obj);
        setTimeout(() => {
            actionsUser.UploadDocument(obj).then(res => {
                if (res) {
                    this.setState({
                        isEdit: false,
                        saving: false,
                    });
                }
            })
        }, 1000);
    }

    render() {
        let {isEdit, saving,  checkBoxCats} = this.state;
        let $content;
        if ( checkBoxCats.length === 0) {
            $content = (  <div className="container-fluid text-center">
                <div className="">
                    <p><Fa icon="spinner" size="5x" spin/></p>
                </div>
            </div>);
        }else{
            $content = (<Jumbotron>
                <h3 className="text-center mb-3">Danh mục thế chấp</h3>
                <Row>
                    {checkBoxCats.map((cat, index) => (
                        <Col md="4" className="text-center home-feature-box" key={cat._id}>
                            <div className="form-label-group">
                                <img className="img-fluid" style={{maxHeight: "200px"}}
                                     src={`${config.apiUrl}/uploads/categories/${cat.icon}`} alt={cat.label}/>
                                <CheckInput
                                    item={cat}
                                    handleChange={this.updateCatState}
                                    key={cat._id}
                                />
                            </div>
                            <span>{cat.label}</span>
                        </Col>
                    ))}
                </Row>
            </Jumbotron>);
        }

        let $button = (<NavLink
            to={"/contact"}
            className="btn btn-lg btn-primary btn-block btn-rounded" id="mySubmit"
            type="submit">Tiếp tục</NavLink>);

        if (isEdit) {
            $button = (
                <div className="phonering-alo-phone phonering-alo-green phonering-alo-show" id="phonering-alo-phoneIcon" style={{right: "0px", bottom: "200px", position: "fixed"}}>
                    <div className="phonering-alo-ph-circle-fill"> </div>
                    <div className="save-img-circle"  disabled={saving}
                         value={saving ? 'Saving...' : 'Save'}
                         onClick={this.handleSubmit}>
                        <span> {saving ? 'Saving...' : 'Save'}</span>
                    </div>
                    {/*<input*/}
                        {/*type="submit"*/}
                        {/*disabled={saving}*/}
                        {/*value={saving ? 'Saving...' : 'Save'}*/}
                        {/*className="btn btn-danger btn-block btn-rounded"*/}
                        {/*onClick={this.handleSubmit}/>*/}
                </div>
            )
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Col md="8" className="mx-auto mt-4 profile-doccument" >
                                {$content}
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
    // cats: PropTypes.array.isRequired,
    checkBoxCats: PropTypes.array.isRequired,
    userprops: PropTypes.object.isRequired,
    actionsCat: PropTypes.object.isRequired,
    actionsUser: PropTypes.object.isRequired,
};

function catsForCheckBoxes(cats, user = null) {
    return cats.map(cat => {
        if (user && user.categories.filter(category => category._id === cat._id).length > 0) {
            cat['checked'] = true;
            return cat;
        } else {
            cat['checked'] = false;
            return cat;
        }

    });
}

// function collectUserCats(cats, user) {
//     let selected = cats.map(cat => {
//         if (user.categories.filter(category => category._id === cat._id).length > 0) {
//             return cat;
//         }
//     });
//     return selected.filter(el => el !== undefined);
// }

function mapStateToProps(state) {

    const stateCats = Object.assign([], state.cats);
    let checkBoxCats = [];
    // let cats = [];
    let userprops = {categories: []};

    if (stateCats.length > 0 && state.userReducers) {
        userprops = state.userReducers;
        if (userprops._id && userprops.categories.length > 0) {
            checkBoxCats = catsForCheckBoxes(stateCats, userprops);
            // cats = collectUserCats(stateCats, userprops);
        } else {
            checkBoxCats = catsForCheckBoxes(stateCats);
        }

    }

    return {
        // cats: cats,
        userprops: userprops, checkBoxCats: checkBoxCats};
}

function mapDispatchToProps(dispatch) {
    return {
        actionsCat: bindActionCreators(catsActions, dispatch),
        actionsUser: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
