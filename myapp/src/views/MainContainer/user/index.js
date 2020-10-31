import React from "react";
import { Table, Space, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import moment from "moment"
import request from '@/utils/request'
import './index.scss'
import {IMGIP} from '../../../config.json'
import '../../../../node_modules/moment/locale/zh-cn';
const { Column } = Table;

class User extends React.Component {
  state = {
    data: [],
    visible: false,
    isAdd: false,


  }

  async componentDidMount() {
    this.userList()

  }
  userList=async()=>{
    const { data } = await request.get('user/list', {
      params: {
        size: 20,
        page: 1
      }
    })

    data.data.forEach((user)=>{
      user.addTime = moment(user.addTime).format("lll")  
    })
    this.setState({
      data: [1,2,3,4,5,6,7,8,9,10].map(item =>{
        return {
          _id: item,
          username: '测试' + item,
          avatar: '测试' + item,
          addTime: new Date().getTime()
        }
      })
    })
    // console.log(data);
  }

  // 编辑弹出框

  handleOkEdit = (id) => {
    this.setState({
      visible: true,
      isAdd: false,
    });
    console.log(id);
    
  };
  // 新增弹出框
  handleOkAdd = () => {
    this.setState({ visible: true, isAdd: true });


  };
  // 取消编辑
  handleCancel = () => {
    this.setState({ visible: false });

  };
  // // 新增用户
  // Add = () => {
  //   this.setState({
  //     visible: false,
  //     isAdd: false
  //   });
  // }

  // // 编辑用户
  // Edit = (id) => {
  //   // console.log(id);
  //   this.setState({
  //     visible: false,
  //     isAdd: true
  //   });
  //   console.log('id=',id);
  // }

  onFinish = values => {
    console.log('Success:', values);
    // isAdd ? this.Edit() : this.Add()
    console.log(this.state.isAdd)
    if(this.state.isAdd){
      // 添加
      this.setState({
        data: [...this.state.data, {
          ...values,
          avatar: new Date(),
          addTime: new Date()
        }]
      }, _ => {
        console.log(this.state.data)
      })
    } else {
      // 修改
    }
    this.setState({
      visible: false,
    });
  };

  // 删除用户
 Delete =async (id) => {
    const { data } = await request.delete(`user/delete/${id}`)
    if(data.code === 1){
      message.success('删除成功')
    }
    else{
      message.error('删除失败')
    }
    this.userList()
  }




  render() {
    const { data, visible, isAdd } = this.state
    // console.log(data);

    return (
      <div className='user'>
        {/* 查询用户和新增 */}

        <div className='search'><Form layout="inline" >
          <Form.Item >
            <Input type="text" placeholder="查询用户" style={{ width: '255px' }} />
          </Form.Item>
        </Form>
          <Space size="middle">
            <Button type="primary" onClick={() => { }}>
              查询
                </Button>
            <Button type="primary" onClick={this.handleOkAdd}>
              新增
                </Button>
          </Space></div>



        <Table dataSource={data} rowKey="_id">
          <Column title="姓名" dataIndex="username" />
          <Column title="注册时间" dataIndex="addTime" />
          <Column title="头像" render={(text, record, index) => (<img src={record.avatar} alt="" className='img' />)
          } />
          <Column
            title="操作"
            render={(text, record) => (
              <Space size="middle">
                <Button type="primary" onClick={() => { this.handleOkEdit(record._id) }}>
                  编辑
                </Button>
                <Popconfirm
                  title="确定要删除这条数据吗"
                  onConfirm={this.Delete.bind(false,record._id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button danger >
                    删除
                </Button>
                </Popconfirm>,
              </Space>
            )}
          />
        </Table>



        {/* 编辑弹出框 */}
        <Modal
          visible={visible}
          title={isAdd ? '新增用户' : '用户编辑'}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button htmlType="submit" key="submit" type="primary" onClick={_ => {
              console.log(_)
              this.submit.click();
            }}
            >
              确定
            </Button>,
          ]}
        >
          <Form layout="inline" style={{ marginBottom: '10px' }} onFinish={this.onFinish}>
            <Form.Item style={{display: 'none'}} name="id" label="用户">
              <Input type="text" placeholder="id" style={{ width: '255px' }} />
            </Form.Item>
            <Form.Item name="username" label="用户">
              <Input type="text" placeholder="用户名" style={{ width: '255px' }} />
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Input type="password" placeholder="密码" style={{ width: '255px' }} />
            </Form.Item>
            <Button style={{display: 'none'}} ref={_ => this.submit = _} htmlType="submit" key="submit" type="primary" onClick={isAdd ? this.Edit : this.Add}
            >
              确定
            </Button>
          </Form>
        </Modal>
      </div>
    )
  }

}

export default User