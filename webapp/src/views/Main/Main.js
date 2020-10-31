import React from 'react'

import { Carousel, WingBlank, Grid } from 'antd-mobile';
import { Router, useHistory,withRouter } from 'react-router-dom';
import {sudoku} from '@/router'
import '@/views/Main/index.scss'
import Lazy from'./lazy.js'

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
@withRouter
class Main extends React.Component {

  state = {
    data: ['slideshow1', 'slideshow2', 'slideshow3', 'slideshow4', 'slideshow5'],
    imgHeight: 176,
    // textData: [
    //   {
    //     text: '壁纸'
    //   },
    //   {
    //     text: '头像'
    //   },
    //   {
    //     text: '表情'
    //   },
    //   {
    //     text: '素材'
    //   },
    //   {
    //     text: '爱豆'
    //   },
    //   {
    //     text: '影视'
    //   },
    //   {
    //     text: '动漫'
    //   },
    //   {
    //     text: '更多分类'
    //   },
    // ]
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['slideshow1', 'slideshow2', 'slideshow3', 'slideshow4', 'slideshow5'],
      });
    }, 100);
  }
  changeTabs=(path)=>{
    console.log('path',path);
    console.log(this.props);
    this.props.history.push(path)
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
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
        {/* 九宫格 */}
        <Grid data={sudoku} hasLine={false} isCarousel onClick={(index)=>{
          // console.log(index);
          let newvalue= sudoku.filter(item=>
            item.path==index.path
          )
        // console.log(newvalue);
          this.changeTabs(newvalue[0].path)
          }
        } />
         {/*  {
            this.state.textData.map((item,index)=>{
            return <div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0,0,0,0.5)',alignItems: 'center', }}>{item.text}</div>
            })
          } */}
          <Lazy></Lazy>
        </div>
      

    );
  }
}

export default Main
{/* {<div style={{ width: '76px', height: '76px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          return item.text</div>} */}