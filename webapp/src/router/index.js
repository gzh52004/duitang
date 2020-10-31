import Main from '@/views/Main/Main'
import Aidou from '@/views/Aidou/Aidou'
import Wall from '@/views/Wall/Wall'
import connect from '@/views/Avatar/Avatar'
import Emoticon from '@/views/Emoticon/Emoticon'
import Television from '@/views/Television/Television'
import Animation from '@/views/Animation/Animation'

import Detailpages from '@/views/Detailpages/Detailpages';
import Login from '@/views/Login';
import Reg from '@/views/Reg';
import Mine from '@/views/Mine';

import list1 from './../assets/images/list1.png'
import list2 from './../assets/images/list2.png'
import list3 from './../assets/images/list3.png'
import list4 from './../assets/images/list4.png'
import list5 from './../assets/images/list5.png'
import list6 from './../assets/images/list6.png'
import list7 from './../assets/images/list7.png'
import list8 from './../assets/images/list8.png'
export let tabs = [
    { title: "首页", query: "main", component: Main, path: '/main', num: '0' },
    { title: "爱豆", query: "celebrity", component: Aidou, path: '/aidou', num: '1' },
    { title: "壁纸", query: "wallpaper", component: Wall, path: '/wall', num: '2' },
    { title: "头像", query: "avatar", component: connect, path: '/avatar', num: '3' },
    { title: "表情", query: "emoticon", component: Emoticon, path: '/emoticon', num: '4' },
    { title: "影视", query: "movie_music_books", component: Television, path: '/television' },
    { title: "动漫", query: "animation", component: Animation, path: '/animation' },
    { title: "动图", query: "gif", component: Main, path: '/main' },
    { title: "素材", query: "material", component: Main, path: '/main' },
    { title: "萌宠", query: "moe", component: Main, path: '/main' },
    { title: "绘画", query: "painting", component: Main, path: '/main' },
    { title: "手工", query: "diy", component: Main, path: '/main' },
    { title: "穿搭", query: "fashion", component: Main, path: '/main' },
    { title: "美妆", query: "beauty", component: Main, path: '/main' },
    { title: "婚礼", query: "wedding", component: Main, path: '/main' },
    { title: "美食", query: "food", component: Main, path: '/main' },
    { title: "家居", query: "Home", component: Main, path: '/main' },
    { title: "旅行", query: "travel", component: Main, path: '/main' },
    { title: "摄影", query: "photography", component: Main, path: '/main' },
    { title: "植物", query: "plant", component: Main, path: '/main' },
    { title: "生活百科", query: "tips", component: Main, path: '/main' },
    { title: "人文艺术", query: "art", component: Main, path: '/main' },
    { title: "设计", query: "design", component: Main, path: '/main' },
    { title: "古风", query: "chinoiserie", component: Main, path: '/main' },
]
export let sudoku =[
    { icon: list1,text: '壁纸',path: '/wall', },
    { icon: list8,text: '头像' , path: '/avatar'},
    { icon: list2,text: '表情' , path: '/emoticon'},
    { icon: list4,text: '素材' , path: '/main'},
    { icon: list7,text: '爱豆' , path: '/aidou'},
    { icon: list3,text: '影视' , path: '/television'},
    { icon: list6,text: '动漫' , path: '/animation'},
    { icon: list5,text: '更多分类' },
]


    export let routes = [
        { title: "登录", query: "login", component: Login, path: '/login' },
        { title: "注册", query: "reg", component: Reg, path: '/reg' },
        { title: "具体页面", query: "detailpages", component: Detailpages, path: '/detailpages' },
        { title: "我的", query: "mine", component: Mine, path: '/mine' },
    ]
