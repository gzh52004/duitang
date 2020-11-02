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
        console.log(_id);
        // e.stopPropagation()
        console.log('lazy.props', this.props);
        console.log(_id);
        this.props.history.push({
            pathname: '/detailpages/' + _id,
            // search: '?id='+id,

        })
        console.log('lazy.props', this.props);

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
                <div className='lazybox' key={rowID}  >
                        <div className='smallbox' onClick={this.detailPages.bind(this, rowData._id)} 
                        >
                            <div >
                                <img src={rowData.photoImg} alt="" >

                                </img>
                                <div className='msg' direction="column" >
                                    <h5 >{rowData.theme}</h5>
                                    <div className='hot' >☆{rowData.hot_count}</div>
                                </div>
                            </div>
                            <div  className='avatarbox'>
                                <img src={rowData.sender.avatar} >
                                </img>
                                <div className='person' >
                                    <a >{rowData.sender.username}</a>
                                    <a >{rowData.theme}</a>
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


