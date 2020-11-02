// import React from 'react'
// import '@/views/Emoticon/index.scss'

// const Emoticon = function () {

//     return (
//         <div>
//             <div className="css-o8bgc8 eas58qq0"></div>
//             表情
//         </div>
//     )
// }
// export default Emoticon



import React from 'react'
import '@/views/Emoticon/index.scss'
import request from './../../utils/request'

import { ListView } from 'antd-mobile';



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

class Emoticon extends React.Component {
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
                Type:'emoticon',
                size: 100
            }
        })
        console.log(datalist);
        datalist.data.forEach((item) => {
            item.photoImg = `http://8.129.38.95:2005/duitang_img/${item.photoImg}`
        })
        datalist.data.forEach((item) => {
            item.sender.avatar = `http://8.129.38.95:2005/duitang_img/${item.sender.avatar}`
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datalist.data)
        });
    }

    onEndReached = (event) => {
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
    detailPages = (_id) => {
        console.log(this.props);
        this.props.history.push({
            pathname: '/detailpages/' + _id,

        })
    }
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className='boxs' >
                    <div>
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
                // renderSeparator={separator}
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

export default Emoticon










