import React from "react";
import { Table, Space,  Button,Modal,Form, Input,Popconfirm, message} from 'antd';
import request from '@/utils/request'
import './index.scss'
const { Column } = Table;
class User extends React.Component {
  state = {
    data: [],
      visible: false,
      isAdd:false,
      id:''
      
    
  }

 confirm=(e)=> {
    console.log(e);
    message.success('Click on Yes');
  }
  
   cancel=(e)=> {
    console.log(e);
    message.error('Click on No');
  }

  async componentDidMount() {
    const { data } = await request.get('user/list', {
      params: {
        size: 20,
        page: 1
      }
    })
    this.setState({
      data: data.data
    })

  }


// 编辑弹出框

handleOkEdit = (id) => {
  this.setState({visible: true,
     isAdd:true,
id:id
    });
 console.log(id);
 
};
// 新增弹出框
handleOkAdd = () => {
  this.setState({visible: true, isAdd:false});
 
 
};
// 取消编辑
handleCancel = () => {
  this.setState({ visible: false });

};
// 新增用户
Add=()=>{
  this.setState({
    visible: false,
    isAdd:false
  });
}

  // 编辑用户
  Edit=(id)=>{
    // console.log(id);
    this.setState({
      visible: false,
      isAdd:true
    });
    console.log(id);
  }
  onFinish = values => {
    console.log('Success:', values);
  };

  // 删除用户
  Delete=(id)=>{
    
      // const { data } = await request.get('user/delete/'+id)
      //   console.log('data',data);
        
  }

  
 

  render() {
    const { data,visible,isAdd} = this.state
    // console.log(data);
  
    return (
      <div className='user'>
        {/* 查询用户和新增 */}
      
       <div className='search'><Form layout="inline" >
        <Form.Item >
            <Input type="text" placeholder="查询用户" style={{width: '255px'}}/>
          </Form.Item> 
        </Form>
        <Space size="middle">
        <Button type="primary" onClick={()=>{}}>
                  查询
                </Button>  
                <Button type="primary" onClick={this.handleOkAdd}>
                新增
                </Button>
                </Space></div>
      


        <Table dataSource={data} rowKey="_id">
          <Column title="姓名" dataIndex="username"  />
          <Column title="注册时间" dataIndex="addTime"  />
          <Column title="头像" render={(text, record, index) => (<img src={record.avatar} alt="" className='img' />)
          }/>
          <Column
            title="操作"
    
            render={(text, record) => (
              <Space size="middle">
                <Button type="primary" onClick={()=>{this.handleOkEdit(record._id)}}>
                  编辑
                </Button>
                <Button danger onClick={()=>{this.Delete(record._id)}}>
                  删除
                </Button>
              </Space>
            )}
          />
        </Table>

           {/* 删除弹框 */}
           <Popconfirm
    title="Are you sure delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <a href="#">Delete</a>
  </Popconfirm>,


              {/* 编辑弹出框 */}
              <Modal
          visible={visible}
          title={isAdd ? '用户编辑' : '新增用户'}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={isAdd ? this.Edit : this.Add }
            >
              确定
            </Button>,
          ]}
        >
        <Form layout="inline" style={{marginBottom: '10px'}} onFinish={this.onFinish}>
        <Form.Item label="用户">
            <Input type="text" placeholder="用户名" style={{width: '255px'}}/>
          </Form.Item> 
          <Form.Item label="密码">
            <Input type="password" placeholder="密码" style={{width: '255px'}}/>
          </Form.Item>
        </Form>
        </Modal>
      </div>
    )
  }

}

export default User