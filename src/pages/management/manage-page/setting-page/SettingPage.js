import React from "react";
import "./SettingPage.css"
import {getSettingList} from "../../../../api/ManageSettingApi";
import SettingCard from "../../../../components/setting_card/SettingCard";
import {Card} from "antd";
import {checkResDataWithToast} from "../../../../api/ApiBaseUrl";

class SettingPage extends React.Component {

    state = {settings:[]}

    goToPage = path => this.props.history.push(path)

    componentDidMount() {
        getSettingList().then(res=>{
            const settings = checkResDataWithToast(res);
            if (settings !== undefined){
                this.setState({
                    settings:settings
                })
            }
        })
    }

    render() {
        const {settings} = this.state
        return (
            <Card className="setting-card" title={<div>配置</div>}>
                {settings.map(val => <SettingCard key={val.name} data={val}/>)}
            </Card>
        );
    }
}

export default SettingPage
