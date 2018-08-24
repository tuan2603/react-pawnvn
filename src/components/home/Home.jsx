import React from 'react';

import './HomePage.css';

import {title} from '../../utils';
import {Gallery,
    Testimonial2,
    DownloadArea,
    DownloadAreaOwner,
    Architecture,
    Disbursement,
    CategoryArea} from '../appy';
import SlideHome from './SlideHome';
import Hotline from './Hotline';



class HomePageMain extends React.Component {
    componentDidMount() {
        document.title = `${title} - Trang chủ`
    }

    render() {
        return (
            <div>
                <SlideHome />
                <Architecture />
                <Disbursement />
                <CategoryArea />
                <Testimonial2 />
                <DownloadArea />
                <Gallery />
                <DownloadAreaOwner />
                <Hotline />
            </div>
        );
    }
}

export default HomePageMain;
