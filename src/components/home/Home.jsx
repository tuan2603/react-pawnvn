import React from 'react';

import './HomePage.css';

import {title} from '../../utils';
import {Gallery,  Testimonial2, DownloadArea, DownloadAreaOwner} from '../appy';



class HomePageMain extends React.Component {
    componentDidMount() {
        document.title = `${title} - Trang chủ`
    }

    render() {
        return (
            <div>
                <Testimonial2 />
                <DownloadArea />
                <Gallery />
                <DownloadAreaOwner />
            </div>
        );
    }
}

export default HomePageMain;
