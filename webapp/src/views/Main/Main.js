import React from 'react'

import { Carousel, WingBlank, Grid } from 'antd-mobile';

import '@/views/Main/index.scss'
import list1 from './../../assets/images/list1.png'
import list2 from './../../assets/images/list2.png'
import list3 from './../../assets/images/list3.png'
import list4 from './../../assets/images/list4.png'
import list5 from './../../assets/images/list5.png'
import list6 from './../../assets/images/list6.png'
import list7 from './../../assets/images/list7.png'
import list8 from './../../assets/images/list8.png'

/* const Main = function () {

    return (
        <div>
            <div className="css-o8bgc8 eas58qq0"></div>
            首页
        </div>
    )
} */

/* let img=[
{icon:require('./../../assets/images/list1.png')},
{icon:require('./../../assets/images/list2.png')},
{icon:require('./../../assets/images/list3.png')},
{icon:require('./../../assets/images/list4.png')},
{icon:require('./../../assets/images/list5.png')},
{icon:require('./../../assets/images/list6.png')},
{icon:require('./../../assets/images/list14.png')},
{icon:require('./../../assets/images/list8.png')},
]; */
// let imgresult=img.map((item,index)=>{
//   console.log(item.icon);
//   return item.icon

// })
// console.log(imgresult); 
// Array.push(img)
// console.log(img[0].icon);
/* const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: img[i].icon,
  text: `name${i}`,
})); */
class Main extends React.Component {

  state = {
    data: ['slideshow1', 'slideshow2', 'slideshow3', 'slideshow4', 'slideshow5'],
    imgHeight: 176,
    listData: [
      { icon: list1,text: '壁纸' },
      { icon: list2,text: '壁纸' },
      { icon: list3,text: '壁纸' },
      { icon: list4,text: '壁纸' },
      { icon: list5,text: '壁纸' },
      { icon: list6,text: '壁纸' },
      { icon: list7,text: '壁纸' },
      { icon: list8,text: '壁纸' },
    ],
    textData: [
      {
        text: '壁纸'
      },
      {
        text: '头像'
      },
      {
        text: '表情'
      },
      {
        text: '素材'
      },
      {
        text: '爱豆'
      },
      {
        text: '影视'
      },
      {
        text: '动漫'
      },
      {
        text: '更多分类'
      },
    ]
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['slideshow1', 'slideshow2', 'slideshow3', 'slideshow4', 'slideshow5'],
      });
    }, 100);
  }
  render() {
    return (
      <div>
        {/* 横线间隙 */}
        <div className="css-o8bgc8 eas58qq0"></div>
        {/* 轮播图 */}
        <WingBlank>
          <Carousel
            autoplay={true}
            infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                href=""
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={require(`./../../assets/images/${val}.png`)}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
        {/* 九宫格 */}
        {/* <div className="sub-title">Carousel</div> */}
        <Grid data={this.state.listData} hasLine={false} isCarousel onClick={_el => console.log(_el)} />
         {/*  {
            this.state.textData.map((item,index)=>{
            return <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0,0,0,0.5)',alignItems: 'center', }}>{item.text}</div>
            })
          } */}

          
        </div>
      

    );
  }
}

export default Main
{/* {<div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          return item.text</div>} */}