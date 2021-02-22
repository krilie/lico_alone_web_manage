import React, {Component} from 'react';
import {Button, Card, Form, Input, message, Table} from "antd";
import {manageDeleteCatchword, manageQueryCatchword} from "../../../../api/ManageCatchwordApi";
import "./CatchwordPage.css"
import {checkResDataWithToast} from "../../../../api/ApiBaseUrl";

class CatchwordPage extends Component {

    state = {
        defPageNum: 1, defPageSize: 10,
        loading: false,
        catchwords: undefined,
    }

    formRef = React.createRef();

    componentDidMount() {
        process.nextTick(() => {
            this.onLoadPageData(this.state.defPageNum, this.state.defPageSize)
        })
    }

    onLoadPageDataWithSearch = (page_num, page_size) => {

        let searchKey = ""
        const ResetToUndefined = (val) => (val === "" || val === null) ? undefined : val
        searchKey = ResetToUndefined(this.formRef.current.getFieldValue("search_key"))

        return this.onLoadPageData(page_num, page_size, searchKey)
    }

    // 分页修改当前页大小 回调
    onLoadPageData = (page_num, page_size, searchKey) => {

        this.setState({loading: true})

        manageQueryCatchword(searchKey, page_size, page_num).then(res => {
            this.setState({
                catchwords: res.data.data
            })
        }).catch(err => {
            message.error(err.toString())
        }).finally(() => {
            this.setState({loading: false})
        })
    }

    columns = [
        {title: 'id', key: 'id', dataIndex: 'id', width: "150px"},
        {title: 'created_at', key: 'created_at', dataIndex: 'created_at',width:"230px"},
        {title: 'updated_at', key: 'updated_at', dataIndex: 'updated_at',width:"230px"},
        {title: 'title', key: 'title', dataIndex: 'title'},
        {title: 'content', key: 'content', dataIndex: 'content'},
        {title: 'sort', key: 'sort', dataIndex: 'sort'},
        {title: '操作',key: '操作',render: val=><div>
                <Button type='primary'>修改</Button>
                <Button type='primary' onClick={()=>this.deleteCatchword(val.id)}>删除</Button>
            </div>}
    ];

    render() {
        const pagedData = this.state.catchwords
        const {loading, defPageNum, defPageSize} = this.state
        // 查询form参数
        const searchForm = <Form
            layout={"inline"}
            ref={this.formRef}
        >
            <Form.Item label="键名" name="search_key">
                <Input defaultValue="" placeholder="请输入"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary"
                        onClick={() => this.onLoadPageDataWithSearch(defPageNum, defPageSize)}>搜索</Button>
            </Form.Item>
        </Form>

        if (pagedData === undefined || pagedData === {})
            return <div>{searchForm}
                <div>Loading...</div>
            </div>

        return (
            <Card className="carousel-card" bodyStyle={{padding: "10px"}}>
                {searchForm}
                <div>
                    <Table
                        bordered
                        scroll={{x: "400px", scrollToFirstRowOnChange: true}}
                        pagination={{
                            showSizeChanger: true,
                            onShowSizeChange: this.onLoadPageDataWithSearch,
                            current: pagedData.page_info.page_num,
                            pageSize: pagedData.page_info.page_size,
                            defaultCurrent: defPageNum,
                            defaultPageSize: defPageSize,
                            position: "bottom",
                            total: pagedData.page_info.total_count,
                            onChange: this.onLoadPageDataWithSearch,
                        }}
                        rowKey={record => record.id}
                        loading={loading}
                        columns={this.columns}
                        onChange={this.onTableParamChange}
                        dataSource={pagedData.data}/>
                </div>
            </Card>
        );
    }

    deleteCatchword(id) {

        this.setState({loading: true})

        manageDeleteCatchword(id).then(res => {
            checkResDataWithToast(res)
        }).catch(err => {
            message.error(err.toString())
        }).finally(() => {
            this.setState({loading: false})
        })
    }
}

export default CatchwordPage;
