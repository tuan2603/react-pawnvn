import React from 'react';
import autoBind from "react-autobind";
import * as config from "../../utils";
import boy from '../../assets/img/boy.svg';

class UploadeImage extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleUploadImage(ev){
        ev.preventDefault();
        this.props.uploadF( this.uploadInput.files[0]);
    }

    render() {

        let {username, filename} = this.props;
        let html = <img className="img-fluid" style={{maxHeight: "200px"}} src={boy} alt="avatar"/>;
        if (username !== null) {
            if (filename !== null) {
                html = <img className="img-fluid" style={{maxHeight: "200px"}}
                            src={config.apiUrl + '/uploads/' + username.phone + '/' + filename}
                            alt="avatar"/>;
            }
        }
        return (
            <div className="form-upload">
                <div className="upload-container">
                    <input ref={(ref) => {
                        this.uploadInput = ref;
                    }}
                           type="file" onChange={this.handleUploadImage} name="file"
                           accept="image/*;capture=camera"/>
                </div>

                <div className="sample_doc">
                    {
                        html
                    }

                    <p> Bấm để chọn ảnh khác</p>
                </div>

            </div>
           )
    }
}

export default UploadeImage;
