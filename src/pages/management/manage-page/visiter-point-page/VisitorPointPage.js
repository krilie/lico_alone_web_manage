import React, {Component} from 'react';
import {Map, Marker} from 'react-amap';
import {getAMapKey} from "../../../../api/ManageSettingApi";
import {getVisitorPoints} from "../../../../api/ManageStatisticApi";
import {Col, Row} from "antd";
import "./VisitorPointPage.css"

class VisitorPointPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapKey: "",
            marker: [],
            currentPos: [117.25, 31.38],
            zoom: 4
        }
    }

    componentDidMount() {
        getAMapKey().then(res => {
            this.setState({
                mapKey: res.data.data.a_map_key,
            })
        })
        getVisitorPoints().then(res => {
            this.setState({
                marker: res.data.data,
            })
        })
    }

    calMarkerCenter(markers) {
        let lonSum = 0;
        let latSum = 0;
        markers.forEach(v => {
            lonSum = lonSum + v.lon;
            latSum = latSum + v.lat;
        })
        return [lonSum / markers.length, latSum / markers.length]
    }

    toPoint = (lon, lat) => {
        this.setState({
            currentPos: [lon, lat],
            zoom: 15
        })
        console.log(`to point ${lon} ${lat}`)
    }
    resetPoint = () => {
        this.setState({
                currentPos: [117.25, 31.38],
                zoom: 6
            }
        )
    }

    render() {
        const {mapKey, marker, currentPos, zoom} = this.state;
        const Markers = marker.map(m => <Marker label={<div>{m.city}</div>} autoRotation={true}
                                                position={[m.lon, m.lat]}/>)
        const markerListView = marker.map(m => <li onClick={e => this.toPoint(m.lon, m.lat)}
                                                   className="point-list-item">{m.city}-{m.lon}-{m.lat}</li>)
        return mapKey === ""
            ?
            <div>loading...</div>
            :
            <Row style={{height: "100%", width: "100%"}}>
                <Col span={4}>
                    <div className="point-list-item" onClick={e=>this.resetPoint()}>共:{Markers.length}</div>
                    {markerListView}
                </Col>
                <Col style={{height: "100%", width: "100%"}} span={20}>
                    <Map
                        amapkey={mapKey}
                        plugins={["ToolBar", 'Scale', 'OverView', 'MapType']}
                        center={currentPos}
                        zoom={zoom}>
                        {Markers}
                    </Map>
                </Col>
            </Row>

            ;
    }
}

export default VisitorPointPage;
