import React, { useState } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import '@/views/Home/index.scss'

const Home = function () {
    const tabs = [
        { title: "首页", query: "main" },
        { title: "爱豆", query: "celebrity" },
        { title: "壁纸", query: "wallpaper" },
        { title: "头像", query: "avatar" },
        { title: "表情", query: "emoticon" },
        { title: "影视", query: "movie_music_books" },
        { title: "动漫", query: "animation" },
        { title: "动图", query: "gif" },
        { title: "素材", query: "material" },
        { title: "萌宠", query: "moe" },
        { title: "绘画", query: "painting" },
        { title: "手工", query: "diy" },
        { title: "穿搭", query: "fashion" },
        { title: "美妆", query: "beauty" },
        { title: "婚礼", query: "wedding" },
        { title: "美食", query: "food" },
        { title: "家居", query: "home" },
        { title: "旅行", query: "travel" },
        { title: "摄影", query: "photography" },
        { title: "植物", query: "plant" },
        { title: "生活百科", query: "tips" },
        { title: "人文艺术", query: "art" },
        { title: "设计", query: "design" },
        { title: "古风", query: "chinoiserie" },
    ]
    useState(tabs)
    return (
        <div>
            <WhiteSpace />
            {/* <div classtitle="css-o8bgc8 eas58qq0"></div> */}
            <Tabs tabs={tabs}
                initialPage={2}
                animated={false}
                useOnPan={false}
                // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                style={{
                    overflow: 'hidden',
                }}
            >
                {
                    console.log(tabs),
                    tabs.map(item =>
                        <div style={{ display: 'flex', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }} key={item.query}>
                            {item.title}
                        </div>)
                }
            </Tabs>
            <WhiteSpace />
        </div>
    )
}
export default Home



