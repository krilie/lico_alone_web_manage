import React, {Component} from 'react';
import {Form, Input, InputNumber, Modal, Spin} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {checkResDataWithToast} from "../../../../api/ApiBaseUrl";
import {ToastErr, ToastNormal} from "../../../../utils/toastNormal";
import {manageAddCatchword, manageUpdateCatchword} from "../../../../api/ManageCatchwordApi";

/**
 * props: isShow isCreate data success(msg) failure(msg)
 */
export class CatchwordCreateUpdateModal extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {waiting: false}
    }

    // 表单
    formRef = React.createRef();

    // 在Dialog点击ok时
    onDialogOk = (isCreate) => {
        if (isCreate) {
            this.createDataItem()
        } else {
            this.updateDataItem()
        }
    }

    // 更新时
    componentDidUpdate(prevProps, prevState, snapshot) {
        process.nextTick(() => {
            let {isShow, isCreate, data} = this.props
            if (isShow) {
                if (this.formRef.current !== null) {
                    if (isCreate) {
                        this.formRef.current.setFieldsValue({...data})
                    } else {
                        this.formRef.current.setFieldsValue({...data})
                    }
                }
            }
        })
    }

    // 更新Carousel
    updateDataItem = () => {
        const {success,failure} = this.props
        const data = {
            id: this.formRef.current.getFieldValue("id"),
            content: this.formRef.current.getFieldValue("content"),
            sort: this.formRef.current.getFieldValue("sort"),
            title: this.formRef.current.getFieldValue("title"),
        }
        this.setState({waiting: true})
        manageUpdateCatchword(data).then(res => {
            var data = checkResDataWithToast(res);
            if (data === undefined){
                ToastNormal(data.message)
                failure(data.message)
            } else {
                success(data.message)
            }
        }).catch(res=>{
            ToastErr(res)
            failure(data.message)
        }).finally(() => {
            this.setState({waiting: false})
        })

    }

    // 创建
    createDataItem = () => {
        const {success,failure} = this.props
        const data = {
            content: this.formRef.current.getFieldValue("content"),
            sort: this.formRef.current.getFieldValue("sort"),
            title: this.formRef.current.getFieldValue("title"),
        }
        this.setState({waiting: true})
        manageAddCatchword(data).then(res => {
            var data = checkResDataWithToast(res);
            if (data === undefined){
                ToastNormal(data.message)
                failure(data.message)
            } else {
                success(data.message)
            }
        }).catch(res=>{
            ToastErr(res)
            failure(data.message)
        }).finally(() => {
            this.setState({waiting: false})
        })
    }

    render() {
        const {isShow, cancel, isCreate} = this.props
        const {waiting} = this.state
        const titleText = isCreate ? "创建" : "修改"

        const layout = {
            labelCol: {span: 3},
            wrapperCol: {span: 21}
        };

        const formShow =
            <Form
                {...layout}
                ref={this.formRef}
            >
                <div hidden={isCreate}>
                    <Form.Item label="键" name="id">
                        <Input disabled={true} defaultValue="" placeholder="请输入"/>
                    </Form.Item>
                </div>
                <Form.Item label="标题" name="title">
                    <TextArea aria-multiline={"true"} defaultValue="" placeholder="请输入"/>
                </Form.Item>
                <Form.Item label="内容" name="content">
                    <TextArea aria-multiline={"true"} defaultValue="" placeholder="请输入"/>
                </Form.Item>
                <Form.Item label="排序" name="sort">
                    <InputNumber defaultValue={0} value={0}/>
                </Form.Item>
            </Form>

        return (
            <Modal
                title={titleText}
                visible={isShow}
                maskClosable={false}
                onOk={() => this.onDialogOk(isCreate)}
                onCancel={() => cancel()}>
                {waiting ? <Spin/> : formShow}
            </Modal>
        );

    }
}
