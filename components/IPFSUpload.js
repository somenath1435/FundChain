import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { post } from 'axios';
import { Button } from 'semantic-ui-react';


class IPFSUpload extends Component {
    state = {
        file: null
    }
    onChange = (e) => {
        console.log(e.target.files);
          this.setState({ file: e.target.files[0] });
    }
    
      onFormSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3001/upload';
        const formData = new FormData();
        formData.append('file', this.state.file);
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'multipart/form-data'
          }
        }
        try {
          const response = await post(url, formData, config)
          this.props.setLink(response.data);
        } catch (err) {
          console.log(err);
        }
    
      }
    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>File to be added:</label>
              <input type="file" name="file" onChange={this.onChange}/>
            </Form.Field>
            <Button
                type="submit"
                floated="right"
                content="Upload"
                icon="add circle"
                secondary
              />
          </Form>
        )
    }
}
export default IPFSUpload