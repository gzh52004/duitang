import React,{useEffect,useState} from "react";
import { Table, Tag, Space } from 'antd';
import request from '@/utils/request'

const { Column} = Table;
const data = [
    {
      key: '1',
      firstName: '姓名',
   
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
 
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
   
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

//   const [data,useEffect] = useState(data)
let User = function(){

    // hook 生命周期函数
    useEffect(async function(){
        const {data} = await request.get('/user/list',{
            params:{
                size:10,
                page:1
            }
        })
        console.log(data);
    })
      
    
    return(
        <div>
          <Table dataSource={data}>
      <Column title="姓名" dataIndex="firstName" key="firstName" />

    <Column title="年龄" dataIndex="age" key="age" />
    <Column title="电话" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={tags => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="操作"
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <a>编辑 {record.lastName}</a>
          <a>删除</a>
        </Space>
      )}
    />
  </Table>,
        </div>
    )
} 

export default User