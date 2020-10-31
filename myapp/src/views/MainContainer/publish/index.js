import React,{useState,useEffect,useLayoutEffect,useMemo,useCallback} from "react";
import { Table, Tag, Space,Image,Button, message,Popconfirm,Modal,Form,Input,Row,Col,Avatar,Upload,Dropdown,Menu} from 'antd';
import { UserOutlined } from '@ant-design/icons'

import request from '@/utils/request'
import {IMGIP} from '../../../config.json'
import DropdownList from './dropdown'
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
let Publish = function(props){
    const [data,setData] = useState(initData)
    const [pagination,setPagination] = useState(paginationInit) // 分页数据
    const [memo,changmemo] = useState(0) // 自定义请求依赖
    const [visible, setVisible] = useState(false); // 模态框 显示隐藏
    const [currentEdit,setCurrentEdit] = useState(currentInit) // 当前编辑数据
    const [imageUrl,changeImageUrl] = useState('') // 上传图片
    const [fromRef,changeFromRef] = useState('') // 定义from ref  把 From 的值传给 Modal
    const [currentClassify,ChangeCurrentClassify] = useState(null)
  
 
   useMemo(async()=>{
      let result = await request.get('publish/list',{
        params:{
          size : 6,
          page : pagination.current,
          Type : currentClassify
        }
      })
        setPagination({
          ...pagination,
          total : result.data.total
        })
        setData(ajaxFormat(result.data.data))
    },[memo])
 
    useEffect(()=>{
      console.log(data[0],'3333')
      if(data[0] == undefined){
        setPagination({
          ...pagination,
          current : 1
        })
        // changeClassify()
      }
    },[data])
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


    function beforeUpload(file) { // 上传图片前检测是否符号规范
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('你只能上传图片');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片不能大于2M');
      }
      return isJpgOrPng && isLt2M;
    }
    const handleChange = info => { // 上传图片响应回调
      if (info.file.status === 'uploading') {
        return;
      }
      if (info.file.status === 'done') {
        let imageUrl = info.file.response.data
        changeImageUrl(imageUrl)
      }
    };
   
    const afterClose = useCallback(()=>{ // 模态框关闭回调
      changeImageUrl('')
    })
    const onOk = useCallback( ()=>{ // 对话框点击确定回调
        fromRef.validateFields().then(async (valuse)=>{ // 通过ref拿 From组件里的值
          console.log(valuse,'4444')
          let reqData = null
          if(imageUrl){
            reqData = {
              ...valuse,
              photoImg : imageUrl || currentEdit.photoImg.props.src
            }
          }else{
            reqData = {...valuse}
          }
            const {data} = await request.put('publish/edit/' + currentEdit._id,{
              ...reqData
            })
            changmemo(memo + 1)
            setVisible(false)
        })
    })
    const onCancel = useCallback(()=>{ // 模态框 取消回调
        // setCurrentEdit(currentInit) // 回到初始值 方便一次更新 
        setVisible(false)
    })
    const changeClassify = useCallback( async (query)=>{ // 按分类请求
      
      let total = await request.get('publish/list',{params:{Type:query}})
      let totalPage = total.data.total / 6
      Math.ceil(totalPage)
      let {data} = await request.get('publish/list',{
          params:{
            size : 6,
            page : pagination.current > totalPage ? 1 : pagination.current,
            Type : query
          }
      })
      setData(ajaxFormat(data.data))   
      if(pagination.current > totalPage){
        setPagination({
          ...pagination,
          total : data.total ,
          current : 1
        })
      }else{
        setPagination({
          ...pagination,
          total : data.total ,
        })
      }
    
      ChangeCurrentClassify(query)   
   
    })
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
        title: <DropdownList changeClassify={changeClassify}></DropdownList>,
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
        render: (text, record) => { // 
          return (
            <Space size="middle">
              <Button type="primary" onClick={ async () => {
                  if(typeof fromRef.setFieldsValue == 'function'){ //  通过ref获取到form 给判断因为第一次进来是空
                        fromRef.setFieldsValue(record) // 改变表单的值的方法
                  }  
                setVisible(true)
                setCurrentEdit(record)
              }}>编辑</Button>
              <Popconfirm placement="topRight" title='确定移除这条数据吗' onConfirm={DelPublish.bind(null,record)} okText="确定" cancelText="取消">
                <Button type="danger">删除</Button>
              </Popconfirm>
              
            </Space>
          )
      },
      },
    ];
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
                  onOk={onOk}
                  onCancel={onCancel}
                  width={1000}
                  afterClose={afterClose}
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
                        initialValues={{ // 默认值为第一次点击的值 之后的值要通过 setFieldsValue方法来修改
                          Type : currentEdit.Type,
                          theme :  currentEdit.theme,
                          publishTitle:currentEdit.publishTitle
                        }}
                        ref={el => changeFromRef(el)}
                      >
                        <Form.Item
                          label="类型"
                          name="Type"
                          rules={[{ required: true, message: '不能为空' }]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                          label="主题"
                          name="theme"
                          rules={[{ required: true, message: '不能为空' }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="内容"
                          name="publishTitle"
                          rules={[{ required: true, message: '不能为空' }]}
                        >
                          <Input />
                        </Form.Item>
              
                      </Form>
                    </Col>
                    <Col span={8}  align='center'>
                      <p>发布内容</p>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={`${IMGIP}upload/headphoto`}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                {imageUrl ? <img src={`${IMGIP}duitang_img/${imageUrl}` } alt="avatar" style={{ width: '100%' }} /> 
                : <img src={currentEdit.photoImg.props.src} alt="avatar" style={{ width: '100%' }} 
                />}
              </Upload>
                    </Col>
                </Row>
              </Modal>
        </div>
    )
} 

function ajaxFormat(arr){ // 格式化ajax请求
  return arr.map((item,index)=>{
    try{
        return {
          key: index + '',
          sender: item.sender.username || 'nihao',
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
    }catch(err){
      console.log(err,'err')
      return {

      }
    }
   

})
}

export default Publish
