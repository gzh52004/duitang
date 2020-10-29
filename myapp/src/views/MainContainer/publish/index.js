import React,{useState,useEffect,useLayoutEffect,useMemo, memo} from "react";
import { Table, Tag, Space,Image  } from 'antd';

import request from '@/utils/request'
import {IMGIP} from '../../../config.json'
import './index.scss'

const columns = [
    {
      title: '发布者',
      dataIndex: 'sender',
      align:'center',
      key: 'sender',
      render: text => <a>{text}</a>,
      width: '100px',
      
    },
    {
      title: '头像',
      dataIndex: 'headPhoto',
      align:'center',
      key: 'headPhoto',
      width: '70px',
    },
    {
      title: '发布类型',
      dataIndex: 'Type',
      align:'center',
      key: 'Type',
      width: '200px',
    },
    {
      title: '发布主题',
      align:'center',
      key: 'theme',
      dataIndex: 'theme',
    },
    {
        title: '发布内容',
        align:'center',
        key: 'publishTitle',
        dataIndex: 'publishTitle',
    },
    {
        title: '内容图片',
        align:'center',
        key: 'photoImg',
        dataIndex: 'photoImg',
    },
    {
        title: '点赞数量',
        align:'center',
        key: 'like_count',
        dataIndex: 'like_count',
    },
    {
        title: '热度',
        align:'center',
        key: 'hot_count',
        dataIndex: 'hot_count',
    },
    {
      title: 'Action',
      align:'center',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const initData = [
    {
      key: '1',
      sender: 'sender',
      headPhoto: 32,
      Type: 'New York No. 1 Lake Park',
      publishTitle : 'nihao',
      photoImg : '图片',
      like_count : 100,
      hot_count : 1,
      theme: ['nice', 'developer'],
    }
  ];

const paginationInit = {
  current: 2,
  pageSize: 6,
  total : 10
}
let Publish = function(){
    const [data,setData] = useState(initData)
    const [pagination,setPagination] = useState(paginationInit)
    const [memo,changmemo] = useState(0)
    useMemo(async()=>{
      let result = await request.get('publish/list',{
        params:{
          size : 6,
          page : pagination.current
        }
      })
        let arr = result.data.data.map((item,index)=>{
            return {
                key: index + '',
                sender: item.sender.username,
                headPhoto: <Image
                width={50}
                height={50}
                src={`${IMGIP}duitang_img/${item.sender.avatar}`}
              />,
                Type: item.Type,
                publishTitle : item.publishTitle,
                photoImg :<Image
                width={100}
                height={100}
                src={`${IMGIP}duitang_img/${item.photoImg}`}
              />
                ,
                like_count : item.like_count,
                hot_count : item.hot_count,
                theme: item.theme,
            }
        })
        setPagination({
          ...pagination,
          total : result.data.total 
        })
        setData(arr)
    },[memo])
    useEffect(()=>{
        // changmemo(memo + 1)
    },[])

    const handleTableChange = ({current, pageSize}, filters, sorter) => {
      setPagination({
        ...pagination,
        current,
        pageSize
      })
      changmemo(memo + 1)
    };
    return(
        <div className="TableStyle">
            <Table columns={columns} 
            dataSource={data}
            pagination={pagination}
            onChange={handleTableChange}
            />
        </div>
    )
} 

export default Publish
