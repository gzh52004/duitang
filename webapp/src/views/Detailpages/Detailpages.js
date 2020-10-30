import React from 'react'
import '@/views/Detailpages/index.scss'
import request from '../../utils/request'

class Detailpages extends React.Component {
    state = {
        data:[
            {
                sender:{
                    avatar:''
                }
            }
        ]
            
        
    };
    componentWillMount(){
        console.log('componentWillMount');
    }
    async componentDidMount() {
        console.log('componentDidMount');
        console.log(this.props);
        let { id } = this.props.match.params
        let { data:{data} } = await request.get('/publish/one/' + id)
        console.log(data);
        data[0].photoImg=`http://10.3.140.198:2005/duitang_img/${data[0].photoImg}`
        data[0].sender.avatar=`http://10.3.140.198:2005/duitang_img/${data[0].sender.avatar}`
        this.setState({
            data: data
        })
        // console.log(data[0].sender.avatar);
    }
    render() {
        let data=this.state.data[0]
        console.log(data);
        console.log(data.photoImg);
        // console.log(data.sender.avatar);
        console.log(this.props);
        return (
            <div>
                <div style={{
                    marginBottom: '15px',
                    padding: '10px 0px',
                    background: 'rgb(255, 255, 255)',
                }}>
                    <div className='Details' style={{
                        marginLeft: '8px',
                        marginRight: '8px',
                    }}>
                        <div className='imgbox' >
                            <img style={{ width: '359px', height: '359.506px', display: 'block' }} src={data.photoImg}>
                            </img>
                        </div>
                        <div className='down' style={{
                            fontSize: '13px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '10px',
                            display: 'flex',
                            fontWeight: '400',
                            marginBottom: '14px',
                            color: 'rgba(170,170,170,1)',
                        }}>
                            去堆糖App下载超清图片
                    <img style={{
                                width: '18px',
                                height: '18px',
                            }} src={require('./../../assets/images/down.png')}>
                            </img>
                        </div>
                        <div className='info'>
                            <p style={{
                                margin: '0',
                                padding: '10px 0',
                                fontSize: '15px',
                                color: '#444',
                            }}>{data.publishTitle}</p>
                            <div style={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'nowrap',
                                paddingBottom: '13px',
                                textAlign: 'left',
                                overflow: 'hidden',
                                display: 'flex',
                            }}>
                                <img src={data.sender.avatar} style={{
                                    display: 'inline - block',
                                    marginRight: '10px',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    borderStyle: 'none',
                                    textAlign: 'left',
                                }}>
                                </img>
                                <div style={{
                                    flex: '1',
                                    minWidth: '0',
                                }}>
                                    <h5 style={{
                                        marginTop: '0',
                                        marginBottom: '3px',
                                        // lineSeight: '18px',
                                        fontSize: '13px',
                                        color: '#444',
                                    }}>
                                        {data.sender.username}
                                </h5>
                                    <span style={{
                                        fontSize: '12px',
                                        color: '#777777',
                                        display: 'inline-block',
                                        width: '100%',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                    }}>
                                        收藏到              {data.theme}
                                </span>
                                </div>
                                <div style={{
                                    height: '37px',
                                    lineHeight: '18px',
                                    fontSize: '11px',
                                    color: '#aaa',
                                }}>
                                    {data.add_datetime}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}
export default Detailpages



