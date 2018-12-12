import React, { Component } from 'react';
import { Form, Input, Upload, Icon } from 'antd';

const FormItem = Form.Item;

class CreatePostForm extends Component {
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  // Stop dragger from uploading before clicking upload button
  beforeUpload = () => {
    return false;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14}
    };

    return (
      <Form layout="vertical">
        <FormItem {...formItemLayout} label="Description">
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input your description!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="image">
          <div className="dropbox">
            {getFieldDecorator('image', {
              rules: [{ required: true, message: 'Please select a image:)' }],
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>
      </Form>
    );
  };
}

// Auto check
export const WrappedCreatePostForm = Form.create()(CreatePostForm);