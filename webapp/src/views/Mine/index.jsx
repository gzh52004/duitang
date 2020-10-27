import React from "react";
import { NavBar, Icon, Flex, Grid } from "antd-mobile";

import "./index.scss";

function Mine(props) {

    const firstList = [
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '我的专辑', 
        },
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '文章/视频', 
        },
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '我的收藏', 
        }
    ]

    const secList = [
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '头像框', 
        },
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '做背景', 
        },
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '花体字', 
        },
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '文案库', 
        },
        {
            icon:
            "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: '朋友圈动图', 
        }
    ]

    return (
        <section className="mine">
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    props.history.push("/main");
                }}
                rightContent={[<Icon key="1" type="ellipsis" />]}
                ></NavBar>
            <Flex onClick={()=>{
                props.history.push("/modification");
            }}>
                <Flex.Item>
                    <div>
                        <img
                            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826021100_PjnFC.thumb.200_200_c.png"
                            alt=""
                        />
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <h3>用户名</h3>
                </Flex.Item>
            </Flex>
            <Grid data={firstList} hasLine={false} columnNum={3}/>
            <div className='notice'>
                <img src="./images/notice_02.jpg" alt=""/>
            </div>
            <div className='com_first'>
                <h3>我的消息</h3>
                <p>今天还未收到赞/收藏/粉丝关注</p>
            </div>
            <div className='com_first'>
                <h3>任务中心</h3>
                <p>拥有糖票：0</p>
            </div>
            <div className='com_first'>
                <h3>图文工具</h3>
            </div>
            <Grid data={secList} activeStyle={false} columnNum={4}/>
            <div className='com_first'>
                <h3>更多服务</h3>
            </div>
            <Grid data={secList} activeStyle={false} columnNum={4}/>
        </section>
    );
}

export default Mine;
