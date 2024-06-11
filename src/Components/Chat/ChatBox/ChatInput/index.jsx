import { socket } from "@/config/socket";
import { sendingMessage } from "@/redux/chat";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "../chatbox.module.scss";

export default function ChatInput() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.id)

    const props = {
        name: 'image',
        action: '/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status == 'done') {
                dispatch(sendingMessage({
                    imageId: info.file.response,
                    id: userId
                }))
                socket.emit('sendMessagePublic', {
                    path: info.file.response.path,
                    id: userId
                })
                axios({
                    url: `/message/send`,
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                    data: {
                        imageId: info.file.response._id,
                        senderId: userId
                    }
                }).then(res => { })
            }
        }
    }

    const handleSubmit = async (data) => {
        if (data.msg != '' && data.msg != undefined) {
            dispatch(sendingMessage({
                content: data.msg,
                id: userId,
            }));
            socket.emit('sendMessagePublic', {
                content: data.msg,
                id: userId,
            });
            form.setFieldValue('msg', '');
            await axios({
                url: `/message/send`,
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: {
                    content: data.msg,
                    senderId: userId
                }
            })
        }
    }

    return (
        <Form className={styles.inputChat} form={form} onFinish={handleSubmit} >
            <Form.Item style={{ marginBottom: "0", width: '90%' }} name='msg'>
                <Input style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    paddingLeft: "20px",
                    fontSize: "20px",
                }}
                    type="text"
                    placeholder="Nhập tin nhắn bạn muốn gửi...." />
            </Form.Item>
            <Form.Item style={{ marginBottom: '0', marginRight: '10px' }}>
                <Upload showUploadList={false} maxCount={1} {...props}>
                    <Button style={{ border: '0' }} icon={<UploadOutlined style={{ fontSize: '30px' }} />}></Button>
                </Upload>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0" }}>
                <Button style={{ border: '0' }} htmlType="submit" icon={<SendOutlined style={{ fontSize: '30px' }} />} />
            </Form.Item>
        </Form >
    )
}