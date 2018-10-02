import React from 'react';
import autoBind from "react-autobind";
import PropTypes from 'prop-types';
import boy from '../../assets/img/boy.svg';

class UploadeImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: ''};
        autoBind(this);
    }

    handleUploadImage(ev){
        ev.preventDefault();
        let reader = new FileReader();
        let file = this.uploadInput.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
        this.props.onChange(file);
        
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let {value, name, label} = this.props;
        //let {username, filename} = this.props;
        let $imagePreview = (<img className="img-fluid" style={{maxHeight: "200px"}} src={boy} alt={label}/>);
       
        if (imagePreviewUrl) {
            $imagePreview = (<img className="img-fluid" style={{maxHeight: "200px"}} src={imagePreviewUrl} alt={label}/>);
        } else if (value) {
            $imagePreview = (<img className="img-fluid" style={{maxHeight: "200px"}} src={value} alt={label}/>);
        } else  {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div className="form-upload">
                <div className="upload-container">
                    <input ref={(ref) => {
                        this.uploadInput = ref;
                    }}
                           type="file" onChange={this.handleUploadImage} name={name}
                           accept="image/*;capture=camera"/>
                </div>

                <div className="sample_doc">
                    {$imagePreview}
                    <p> Bấm để chọn ảnh khác</p>
                </div>

            </div>
           )
    }
}
UploadeImage.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
};
export default UploadeImage;
