import {Layout, Menu} from 'antd';
import React from "react";
import "./ManagePage.css"
import {Route, Switch} from "react-router";
import SettingPage from "./setting-page/SettingPage";
import FilePage from "./file-page/FilePage";
import CarouselPage from "./carousel-page/CarouselPage";
import ArticleHomePage from "./article-page/ArticleHomePage";
import {Redirect} from "react-router-dom";
import VisitorPointPage from "./visiter-point-page/VisitorPointPage";
import CatchwordPage from "./catchword-page/CatchwordPage";

const {Sider} = Layout;

export default class ManagePage extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        const {pathname} = this.props.location;
        this.state = {
            currentPage: pathname
        }
    }

    goToPage = path => this.props.history.push(path)

    handleClick = e => {
        console.log(e.key)
        this.props.history.push(e.key);
        this.setState({
            currentPage: e.key,
        });
    };

    render() {
        return (
            <Layout>
                <Sider className="sider-layout-background" width={"60px"}>
                    <Menu onClick={this.handleClick}
                          selectedKeys={[this.state.currentPage]}
                          className="sider-layout-background"
                          mode="inline"
                          defaultSelectedKeys={['4']}>
                        <Menu.Item className="v-center" key = {`/manage/setting`}>设置</Menu.Item>
                        <Menu.Item className="v-center" key = {`/manage/files`}>文件</Menu.Item>
                        <Menu.Item className="v-center" key = {`/manage/carousel`}>轮播图</Menu.Item>
                        <Menu.Item className="v-center" key = {`/manage/article`}>文章</Menu.Item>
                        <Menu.Item className="v-center" key = {`/manage/visitor_point`}>访问</Menu.Item>
                        <Menu.Item className="v-center" key = {`/manage/catchword`}>流行语</Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="manage-layout">
                    <Switch>
                        <Route  path={`/manage/setting`} component={SettingPage}/>
                        <Route  path={`/manage/files`} component={FilePage}/>
                        <Route  path={`/manage/carousel`} component={CarouselPage}/>
                        <Route  path={`/manage/article`} component={ArticleHomePage}/>
                        <Route  path={`/manage/visitor_point`} component={VisitorPointPage}/>
                        <Route  path={`/manage/catchword`} component={CatchwordPage}/>
                        <Redirect path={`/manage/`}
                                  to={{pathname: `/manage/setting`}}/>
                    </Switch>
                </Layout>
            </Layout>
        );
    }
}
