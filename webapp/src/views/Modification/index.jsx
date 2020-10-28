import React from "react";
import {
    ImagePicker,
    WingBlank,
    List,
    InputItem,
    Toast,
    Picker,
    DatePicker,
} from "antd-mobile";
import { createForm } from "rc-form";
import ChinaLocation from "china-location";

import "./index.scss";

// 行政区三级联动数据显示处理
import districtData from "@/assets/location/index.json";
let antdDistrict = [];
Object.keys(districtData).forEach((index) => {
    let itemLevel1 = {};
    let itemLevel2 = {};
    itemLevel1.value = districtData[index].code;
    itemLevel1.label = districtData[index].name;
    itemLevel1.children = [];
    let data = districtData[index].cities;
    Object.keys(data).forEach((index) => {
        itemLevel2.value = data[index].code;
        itemLevel2.label = data[index].name;
        itemLevel2.children = [];
        let data2 = data[index].districts;
        let itemLevel3 = {};
        itemLevel3.children = [];
        Object.keys(data2).forEach((index) => {
            itemLevel3.value = index;
            itemLevel3.label = data2[index];
            itemLevel2.children.push(itemLevel3);
            itemLevel3 = {};
        });
        itemLevel1.children.push(itemLevel2);
        itemLevel2 = {};
    });
    antdDistrict.push(itemLevel1);
});
const location = new ChinaLocation(districtData);

// 图片数据
const data = [
    {
        url: "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg",
        id: "2121",
    },
];

const colorStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    width: "16px",
    height: "16px",
    marginRight: "10px",
};

// 性别
const gender = [
    {
        label: (
            <div>
                <span style={{ ...colorStyle }} />
                <span>男</span>
            </div>
        ),
        value: "男",
    },
    {
        label: (
            <div>
                <span style={{ ...colorStyle }} />
                <span>女</span>
            </div>
        ),
        value: "女",
    },
];

// 初始化日期
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Modification extends React.Component {
    state = {
        files: data,
        gender: ["男"],
        time:now
    };

    /* 图片更改或者删除时触发 */
    onImgChange = (files, type, index) => {
        console.log("onChange=", files, type, index);
        this.setState({
            files,
        });
    };

    /* 点击性别确定时的触发函数 */
    onChangeGender = (gender) => {
        this.setState({
            gender,
        });
        console.log(gender);
    };

    render() {
        const { files } = this.state;
        let { getFieldProps, getFieldError } = this.props.form;

        const validateUserName = (rule, value, callback) => {
            // 不允许为空
            if (!value) {
                callback(new Error("不允许为空"));
            } else {
                callback();
                /* 发送请求修改信息 */
            }
        };

        return (
            <section className="modification">
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onChange={this.onImgChange}
                        onImageClick={(index, fs) =>
                            console.log("onImageClick", index, fs)
                        }
                        /* 是否显示添加按钮 */
                        selectable={files.length < 1}
                        /* 是否多选 */
                        multiple={false}
                        length={1}
                    />
                </WingBlank>
                <List>
                    <InputItem
                        {...getFieldProps("username", {
                            validate: [
                                {
                                    trigger: "onBlur",
                                    rules: [{ validator: validateUserName }],
                                },
                            ],
                        })}
                        error={!!getFieldError("username")}
                        onErrorClick={() => {
                            Toast.info(getFieldError("username"), 2);
                        }}
                        clear
                    >
                        昵称
                    </InputItem>
                    <InputItem
                        clear
                        onBlur={(value) => {
                            console.log(value);
                            /* 发送ajax请求修改简介 */
                        }}
                    >
                        简介
                    </InputItem>
                    <Picker
                        data={gender}
                        value={this.state.gender}
                        cols={1}
                        onChange={this.onChangeGender}
                    >
                        <List.Item key="gender" arrow="horizontal">
                            性别
                        </List.Item>
                    </Picker>
                    <Picker
                        extra="请选择(可选)"
                        data={antdDistrict}
                        title="Areas"
                        {...getFieldProps("district", {
                            initialValue: ["340000", "341500", "341502"],
                        })}
                        onOk={(e) => {
                            console.log("ok", e);

                            /* 数组解构 */
                            const [newProvince, newCity, newDistrict] = e;

                            /* 转化成locations对象 */
                            location.changeLocation(
                                newProvince,
                                newCity,
                                newDistrict
                            );

                            /* 将地址的code码转化为对象 */
                            const newLocation = location.getCurrentAddress();

                            console.log(newLocation);
                        }}
                    >
                        <List.Item key="area" arrow="horizontal">
                            地区
                        </List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        value={this.state.time}
                        onChange={(date) => {
                            this.setState({
                                time:date
                            })
                            console.log('中国标准时间',date);
                            console.log('时间戳',new Date(date).getTime());
                        }}
                    >
                        <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                </List>
            </section>
        );
    }
}
export default createForm()(Modification);
