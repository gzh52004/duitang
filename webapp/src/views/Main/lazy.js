import React from 'react'
import { ListView } from 'antd-mobile';
import request from './../../utils/request'
import '@/views/Main/index.scss'
import { Route, Redirect, Switch, Link, NavLink, withRouter, useHistory } from 'react-router-dom';


const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

@withRouter
class List extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            dataList: []
        };
    }

    async componentDidMount() {
        const { data: datalist } = await request.get('publish/list', {
            params: {
                page: 1,
                size: 100
            }
        })
        console.log(datalist);
        datalist.data.forEach((item) => {
            item.photoImg = `http://10.3.140.198:2005/duitang_img/${item.photoImg}`
        })
        datalist.data.forEach((item) => {
            item.sender.avatar = `http://10.3.140.198:2005/duitang_img/${item.sender.avatar}`
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datalist.data)
        });
    }
    detailPages = (_id) => {
        // console.log(e);
        // e.stopPropagation()
        console.log('lazy.props', this.props);
        // console.log(_id);
        this.props.history.push({
            pathname: '/detailpages/' + _id,
            // search: '?id='+id,

        })
    }
    onEndReached = (event) => {
        // le: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }

    render() {

        const row = (rowData, sectionID, rowID) => {
            // console.log('rowData', rowData, 'sectionID', sectionID, rowID);
            return (
                <div key={rowID} className='boxs' style={{ display: 'flex', flexDirection: 'row', width: '169.5px', }}>
                    <div  >
                        <div onClick={
                            this.detailPages.bind(this, rowData._id)
                        }
                            style={{
                                width: '169px',
                                height: '267px',
                                left: '181px',
                                top: ' 0px',
                                margin: '15px 0 0 0',
                                backgroundColor: 'white',
                                borderRadius: '0 0 5px 5px '
                            }}>
                            <div style={{ width: '169px' }}>
                                <img src={rowData.photoImg} alt="" style={{ height: '169.5px', width: '169.5px', display: 'block', objectFit: 'cover', objectPosition: 'center center', borderRadius: '5px 5px 0 0' }}>

                                </img>
                                <div direction="column" style={{
                                    padding: '8px 8px 5px',
                                    borderBottom: '1px solid rgb(224, 224, 224)',
                                }}>
                                    <h5 style={{
                                        fontSize: '12px',
                                        color: 'rgb(51, 51, 51)',
                                        margin: '0px',
                                        padding: '0px',
                                        fontSize: '12px'
                                    }}>{rowData.theme}</h5>
                                    <div style={{
                                        color: 'rgb(153, 153, 153)',
                                        marginTop: '5px',
                                        fontSize: '12px'
                                    }}>☆{rowData.hot_count}</div>
                                </div>
                            </div>
                            <div style={{
                                lineHeight: '30px',
                                padding: '8px',
                                alignItems: 'center',
                                textAlign: 'left',
                                overflow: 'hidden',
                                display: 'flex',
                            }}>
                                <img src={rowData.sender.avatar} style={{
                                    backgroundSize: '100%',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '100%',
                                    fontSize: '12px'
                                }}>
                                </img>
                                <div style={{
                                    textAlign: 'center',
                                    marginLeft: '8px',
                                    display: 'flex',
                                    overflow: 'hidden',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column'
                                }}>
                                    <a style={{
                                        lineHeight: '1.5',
                                        margin: '0px',
                                        padding: '0px',
                                        background: 'transparent',
                                        textDecoration: 'none',
                                        outline: 'none',
                                        color: 'rgb(52, 152, 219)',
                                        fontSize: '12px'
                                    }}>{rowData.sender.username}</a>
                                    <a style={{
                                        lineHeight: '1.5',
                                        margin: '0px',
                                        padding: '0px',
                                        background: 'transparent',
                                        textDecoration: 'none',
                                        outline: 'none',
                                        color: 'rgb(51, 51, 51)',
                                        fontSize: '12px'
                                    }}>{rowData.theme}</a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div >
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                // renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                className="am-list"
                pageSize={4}
                useBodyScroll
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default List


