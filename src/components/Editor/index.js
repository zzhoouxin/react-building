/**
 * @file 组件属性编辑组件
 * @author wuya
 */
import React, {Component} from 'react';
import {Radio} from 'antd';

import Form from "react-jsonschema-form";

import {createSchemaByDefaultValue} from '../../common/util';

const { Item: FormItem } = Form;
const { Group: RadioGroup } = Radio;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

class Editor extends Component {
    constructor(props) {
        super(props);

        const { instance } = props;
        const { options, columns } = instance;
        this.state = {
            options,
            columns,
        };
    }


    handleSubmit = (data) => {
        this.props.submit(data);
    }

    render() {
        const {
            field,
            props,
            mergedProps,
            uiSchema,
        } = this.props.instance;
        console.log("this.props.instance====>",this.props.instance)
        let defaultValue = {
            props,
        };
        if (field) {
            defaultValue.field = field;
        }
        if (mergedProps) {
            defaultValue = {
                ...defaultValue,
                mergedProps,
            }
        }
        const schema = createSchemaByDefaultValue(defaultValue);
        console.log("schema====>",schema)

        return (
            <div className="editor__form">
                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default Editor;
