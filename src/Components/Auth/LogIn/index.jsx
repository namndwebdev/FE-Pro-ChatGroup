import { loginSuccess } from "@/redux/auth";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../auth.module.scss";

export default function LogIn() {
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (value) => {
        try {
            let res = await axios.post(`/login`, value)
            dispatch(loginSuccess(res.data))
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công!'
            })
            setTimeout(() => {
                window.location.href = '/'
            }, 500)
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error.response.data.message
            })
        }
    }

    return (
        <>
            {contextHolder}
            <div className={styles.jsxRightAuthentication}>
                <span className={styles.jaxSd}>
                    Chưa có tải khoản?{" "}
                    <Link
                        to="/register"
                    >
                        Đăng ký tại đây!
                    </Link>
                </span>

                <div className={styles.rowJax}>
                    <div
                        className={styles.chukJaxAuth}
                    >
                        <div
                            className={styles.titleAuthentication}
                        >
                            <h1>Đăng nhập</h1>
                            <p>Nhập thông tin của bạn phía dưới</p>
                        </div>
                        <Form onFinish={handleSubmit} layout="vertical" >
                            <Form.Item name={'email'} label={'Email'} rules={[
                                {
                                    required: true,
                                    message: 'Email trống!'
                                },
                                {
                                    type: 'email',
                                    message: 'Sai định dạng email!'
                                }
                            ]}>
                                <Input
                                    className={styles.jsxInputAuthentication}
                                    placeholder="Nhập email của bạn eg: abc@gmail.com" />
                            </Form.Item>
                            <Form.Item name={'password'} label={'Mật khẩu'} rules={[
                                {
                                    required: true,
                                    message: 'Mật khẩu trống!'
                                },
                                {
                                    min: 6,
                                    message: 'Tối thiểu 6 ký tự!'
                                },
                            ]}>
                                <Input.Password
                                    className={styles.jsxInputAuthentication}
                                    placeholder="Nhập password của bạn eg: matkhaucauban"
                                    autoComplete="on"
                                />
                            </Form.Item>
                            <Form.Item>
                                <a href="/" style={{ float: 'right', margin: "10px 0", textDecoration: "none" }}>Quên mật khẩu?</a>
                                <Button style={{ width: '100%' }} htmlType="submit" type="primary" size="large">Đăng nhập</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}