import React from "react";
import {connect} from 'react-redux'
import { NavBar, Icon, Flex, Grid, Popover } from "antd-mobile";

import "./index.scss";
import { withAuth } from "@/utils/hoc";
import userAction from '@/store/actions/user';

const Item = Popover.Item;

function Mine(props) {

    let {userInfo:{result}} = props;
    let avatar = `http://10.3.140.198:2005/duitang_img/${result.avatar}`

    const firstList = [
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "我的专辑",
        },
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "文章/视频",
        },
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "我的收藏",
        },
    ];

    const secList = [
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "头像框",
        },
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "做背景",
        },
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "花体字",
        },
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "文案库",
        },
        {
            icon:
                "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            text: "朋友圈动图",
        },
    ];

    const onHandleLogout = () => {
        props.dispatch({
            type:'logout'
        })
      };

    return (
        <section className="mine">
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    props.history.push("/main");
                }}
                rightContent={
                    <Popover
                        mask
                        overlayClassName="fortest"
                        overlayStyle={{ color: "currentColor" }}
                        overlay={[
                            <Item
                                key="4"
                                value="scan"
                                icon={<img src={`https://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg`} className="am-icon am-icon-xs" alt="" />}
                                data-seed="logout"
                            >
                                退出
                            </Item>
                        ]}
                        align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                        }}
                        onSelect={onHandleLogout}
                    >
                        <div
                            style={{
                                height: "100%",
                                padding: "0 15px",
                                marginRight: "-15px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Icon type="ellipsis" />
                        </div>
                    </Popover>
                }
            ></NavBar>
            <Flex
                onClick={() => {
                    props.history.push("/modification");
                }}
            >
                <Flex.Item>
                    <div>
                        <img
                            src={avatar}
                            alt=""
                        />
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <h3>{result.username}</h3>
                </Flex.Item>
            </Flex>
            <Grid data={firstList} hasLine={false} columnNum={3} />
            <div className="notice">
                <img src="./images/notice_02.jpg" alt="" />
            </div>
            <div className="com_first">
                <h3>我的消息</h3>
                <p>今天还未收到赞/收藏/粉丝关注</p>
            </div>
            <div className="com_first">
                <h3>任务中心</h3>
                <p>拥有糖票：0</p>
            </div>
            <div className="com_first">
                <h3>图文工具</h3>
            </div>
            <Grid data={secList} activeStyle={false} columnNum={4} />
            <div className="com_first">
                <h3>更多服务</h3>
            </div>
            <Grid data={secList} activeStyle={false} columnNum={4} />
        </section>
    );
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {

        // 测试redux_saga
        dispatch,
        logout(){
            dispatch(userAction.logout())
        }
    }
}

Mine = connect(mapStateToProps,mapDispatchToProps)(Mine);

export default withAuth(Mine);
