import React from 'react'
import {Menu, Dropdown,Button} from 'antd'
import { DownOutlined } from '@ant-design/icons';

const list = [
  {name: "全部", query: null},
  {name: "爱豆", query: "celebrity"},
  {name: "壁纸", query: "wallpaper"},
  {name: "头像", query: "avatar"},
  {name: "表情", query: "emoticon"},
  {name: "影视", query: "movie_music_books"},
  {name: "动漫", query: "animation"},
  {name: "动图", query: "gif"},
  {name: "素材", query: "material"},
  {name: "萌宠", query: "moe"},
  {name: "绘画", query: "painting"},
  {name: "手工", query: "diy"},
  {name: "穿搭", query: "fashion"},
  {name: "美妆", query: "beauty"},
  {name: "婚礼", query: "wedding"},
  {name: "美食", query: "food"},
  {name: "家居", query: "home"},
  {name: "旅行", query: "travel"},
  {name: "摄影", query: "photography"},
  {name: "植物", query: "plant"},
  {name: "生活百科", query: "tips"},
  {name: "人文艺术", query: "art"},
  {name: "设计", query: "design"},
  {name: "古风", query: "chinoiserie"},
]

const DropdownList = function(props){
    const menu = (
        <Menu>
            {
                 list.map((classify)=>{
                    return <Menu.Item key={classify.query} onClick={()=>{
                        props.changeClassify(classify.query)
                    }}>
                        {classify.name}
                    </Menu.Item>
                })
            }
          
        </Menu>
      );
    return (
        <>
        <Dropdown overlay={menu} trigger="click">
            <Button>
                发布类型 <DownOutlined />
            </Button>
        </Dropdown>
        </>
    )
}

export default DropdownList