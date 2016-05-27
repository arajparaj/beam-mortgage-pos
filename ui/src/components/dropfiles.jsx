import React, {PropTypes} from 'react'
var Dropzone = require('react-dropzone');

class DropFiles extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            files: []
        }
    }
    onDrop(files) {
        let newFiles = this.state.files;
        files.forEach((file) => {
            console.log(file)
            newFiles.push(file.name);
        });
        this.setState({
          files: newFiles
        });
    }
    render() {
        let fileList = this.state.files.map((file)=>(<li>{file}</li>))
        return (
            <div>
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <div>
                        Try dropping some files here, or click to select files to upload.
                    </div>
                </Dropzone>
                <ol>
                  {fileList}
                </ol>
            </div>
        );
    }
}

export default DropFiles;
