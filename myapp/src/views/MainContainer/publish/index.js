import React,{useState,useEffect,useLayoutEffect,useMemo, memo, useCallback} from "react";
import { Table, Tag, Space,Image,Button, message,Popconfirm,Modal,Form,Input,Row,Col,Avatar,Upload} from 'antd';
import { UserOutlined } from '@ant-design/icons'

import request from '@/utils/request'
import {IMGIP} from '../../../config.json'
import './index.scss'


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
      theme: "[nice', 'developer]"
    }
  ];

const paginationInit = {
  current: 1,
  pageSize: 6,
  total : 10
}
const currentInit = {
  Type: "",
  headPhoto: {props: {src:''}},
  hot_count: 0,
  key: "",
  like_count: 0,
  photoImg: {props: {src:''}},
  publishTitle: "",
  sender: "",
  theme: "",
  _id: "",
}
let Publish = function(){
    const [data,setData] = useState(initData)
    const [pagination,setPagination] = useState(paginationInit)
    const [memo,changmemo] = useState(0)
    const [visible, setVisible] = useState(false);
    const [currentEdit,setCurrentEdit] = useState(currentInit)
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
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.like_count - b.like_count,
      },
      {
          title: '热度',
          align:'center',
          key: 'hot_count',
          dataIndex: 'hot_count',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.hot_count - b.hot_count,
      },
      {
        title: 'Action',
        align:'center',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Button type="primary" onClick={() => {
                let current = record
                setCurrentEdit(current)
                setVisible(true)
                console.log(currentEdit,'5555')
              }}>编辑</Button>
              <Popconfirm placement="topRight" title='确定移除这条数据吗' onConfirm={DelPublish.bind(null,record)} okText="确定" cancelText="取消">
                <Button type="danger">删除</Button>
              </Popconfirm>
              
            </Space>
          )
      },
      },
    ];
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
                _id : item._id
            }
        })
        setPagination({
          ...pagination,
          total : result.data.total 
        })
        console.log(pagination,'444444')
        setData(arr)
    },[memo])
    useEffect(()=>{
        // changmemo(memo + 1)
    },[])
    const DelPublish = useCallback(async (record)=>{
        const {data} = await request.delete(`publish/delete/${record._id}`)
        if(data.code === 1){
          message.success('删除成功')
          changmemo(memo + 1)
        }else{
          message.error('删除失败')
        }
        
        
    })
    const handleTableChange = ({current, pageSize}, filters, sorter) => {
      // console.log(sorter,'sorter,sortersortersortersorter')
      setPagination({
        ...pagination,
        current,
        pageSize
      })
      changmemo(memo + 1)
    };

    // 发布图片 ->
    const uploadButton = (
      <div>
         <img className="uploadButton" src="http://10.3.140.198:2005/duitang_img/20201013185607_kcGQL.jpeg" />
      </div>
    );
    const imageUrl = ''
    function beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      console.log(isJpgOrPng,'fff',isLt2M,'5555')
      // return isJpgOrPng && isLt2M;
      
    }
    const handleChange = info => {
      console.log(info,'555555354353')
      if (info.file.status === 'uploading') {

        // this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          console.log(imageUrl,'imgege')
          // this.setState({
          //   imageUrl,
          //   loading: false,
          // }),
        );
      }
    };
    

    return(
        <div className="TableStyle">
            <Table columns={columns} 
            dataSource={data}
            pagination={pagination}
            onChange={handleTableChange}
            />
             <Modal
                  title="发布内容编辑"
                  centered
                  visible={visible}
                  onOk={() => setVisible(false)}
                  onCancel={() => setVisible(false)}
                  width={1000}
                >
                  <Row>
                    <Col span={4} align='center'>
                        <p>{currentEdit.sender}</p>
                      <Avatar size={64} icon={<UserOutlined />} src={currentEdit.headPhoto.props.src} />
                    </Col>
                    <Col span={12}  align='center'>
                    <Form
                        // {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                      >
                        <Form.Item
                          label="类型"
                          name="Type"
                          initialValue={currentEdit.Type}
                          // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="主题"
                          name="theme"
                          initialValue={currentEdit.theme}
                          // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="内容"
                          name="publishTitle"
                          initialValue={currentEdit.publishTitle}
                          // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                          <Input />
                        </Form.Item>
              
                      </Form>
                    </Col>
                    <Col span={8}  align='center'>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
                    </Col>
                 </Row>
              </Modal>
        </div>
    )
} 

export default Publish
