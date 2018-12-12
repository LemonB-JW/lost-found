import React, { Component } from 'react';
import $ from 'jquery';
import { Modal, Button, message } from 'antd';
import { WrappedCreatePostForm } from './CreatePostForm';
import { API_ROOT, AUTH_PREFIX } from '../constants';

export class CreatePost extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ confirmLoading: true });
    this.form.validateFields((err, values) => {
      if (!err) {
        const { lat, lon } = JSON.parse(localStorage.getItem('POS_KEY'));
        const formData = new FormData();
        formData.set('lat', lat);
        formData.set('lon', lon);
        formData.set('message', values.message);
        formData.set('image', values.image[0].originFileObj);

        $.ajax({
          url: `${API_ROOT}/post`,
          method: 'POST',
          data: formData,
          headers: {
            Authorization: `${AUTH_PREFIX} ${localStorage.getItem('TOKEN_KEY')}`,
          },
          processData: false,
          contentType: false,
          dataType: 'text',
        }).then((response) => {
          message.success('Created a post successfully!');
          this.form.resetFields();
          this.setState({ visible: false, confirmLoading: false });
          this.props.loadNearbyPost();
        }, (response) => {
          message.error(response.responseText);
          this.setState({ visible: false, confirmLoading: false });
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>I Wanna Post!</Button>
        <Modal title="Upload description and images of your lost/found pet"
               visible={visible}
               onOk={this.handleOk}
               okText="Create"
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
        >
          <WrappedCreatePostForm ref={this.saveFormRef}/>
        </Modal>
      </div>
    );
  }
}
