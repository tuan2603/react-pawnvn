import React from "react";
import {
   Route, Switch
} from "react-router-dom";

import Home from './Componet/Home/Home';
import About from './Componet/About/About';
import SignUp from './Componet/Contact/SignUp';
import SignIn from './Componet/Contact/SignIn';
import Contact from './Componet/Contact/Contact';
import DocumentPage from './Componet/UserInfo/DocumentPage';
import Privacy from './Componet/Privacy/Privacy';
import Verify from './Componet/Verify/Verify';
import ProfilePicture from './Componet/UserInfo/ProfilePicture';
import IndentilyCard from './Componet/UserInfo/IndentilyCard';
import BusinessRegistration from "./Componet/UserInfo/BusinessRegistration";




const Routes = () => (
    <Switch>
        <Route exact path='/' strict  component={Home}/>
        <Route path='/about' component={About}/>
        <Route exact path='/contact' strict component={Contact}/>
        <Route exact path='/signup' strict component={SignUp}/>
        <Route exact path='/signin' strict component={SignIn}/>
        <Route path='/example' component={CRUD}/>
        <Route path='/privacy' component={Privacy}/>
        <Route path='/verify' component={Verify}/>
        <Route path='/update-user-acount' component={DocumentPage}/>
        <Route path='/documents/profile-pictrue' component={ProfilePicture}/>
        <Route path='/documents/identily-card' component={IndentilyCard}/>
        <Route path='/documents/business-registration' component={BusinessRegistration}/>

        <Route exact path='/css' component={CSSPage} />
        <Route exact path='/css/table' component={TablePage} />
        <Route exact path='/components' component={ComponentsPage} />
        <Route path='/components/badge' component={BadgePage} />
        <Route path='/components/breadcrumb' component={BreadcrumbPage} />
        <Route path='/components/media' component={MediaPage} />
        <Route path='/components/input' component={InputPage} />
        <Route path='/components/alert' component={AlertPage} />
        <Route path='/components/dropdown' component={DropdownPage} />
        <Route path='/css/icons' component={FaPage} />
        <Route path='/css/jumbotron' component={JumbotronPage} />
        <Route path='/components/cards' component={CardsPage} />
        <Route path='/components/buttons' component={ButtonPage} />
        <Route path='/components/forms' component={FormsPage} />
        <Route path='/components/progress' component={ProgressPage} />
        <Route path='/components/popover' component={PopoverPage} />
        <Route path='/components/pagination' component={PaginationPage} />
        <Route path='/components/list-group' component={ListGroupPage} />
        <Route path='/components/tooltips' component={TooltipsPage} />
        <Route path='/components/footer' component={FooterPage} />
        <Route exact path='/advanced' component={AdvancedPage} />
        <Route path='/advanced/modal' component={ModalPage} />
        <Route path='/advanced/carousel' component={CarouselPage} />
        <Route path='/advanced/collapse' component={CollapsePage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/css/masks' component={MasksPage} />
        <Route path='/css/hover' component={HoverPage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/advanced/charts' component={ChartsPage} />
        <Route path='/advanced/scrollbar' component={ScrollBarPage} />
        <Route render = { function() {
            return <h1>Not Found</h1>;
        }} />
    </Switch>
);


export default Routes;
