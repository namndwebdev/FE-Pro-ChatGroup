import { socket } from "@/config/socket";
import { getUserList, receivedMessage } from "@/redux/chat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import ChatBox from "./ChatBox";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from './chat.module.scss';
import Setting from "./Setting";

function Chat() {
    const dispatch = useDispatch()
    const isSettingOpen = useSelector(state => state.toggle.isSettingOpen)

    useEffect(() => {
        function onConnect() {
            console.log('Connected')
        }

        function onGetUserList(data) {
            dispatch(getUserList(data))
        }

        function onReceive(data) {
            console.log(data)
            dispatch(receivedMessage(data))
        }

        function onReceiveUser(data) {
            console.log(data)
            dispatch(getUserList(data))
        }

        socket.on('connect', onConnect);
        socket.on('getUserList', onGetUserList)
        socket.on('receiveMessagePublic', onReceive)
        socket.on('receiveUser', onReceiveUser)

        return () => {
            socket.off('connect', onConnect);
            socket.off('getUserList', onGetUserList)
            socket.off('receiveMessagePublic', onReceive)
            socket.off('receiveUser', onReceiveUser)
        }
    }, [])

    return (
        <main>
            <Row id="chat" className={`ms-0 ${styles.limitHeight} ${styles.chat}`} style={{ width: "100%" }}>
                <Col md={3} sm={0} className={`pe-0 ps-0 ${styles.hiddenMb}`}>
                    <SideBar />
                </Col>
                <Col md={9} className="d-flex justify-content-between ps-0 pe-0 chatbox">
                    <div className="flex-w100 flex-grow-1 h-100">
                        <Header className="py-3 custom-header-account" />
                        <ChatBox />
                    </div>
                    <Setting />
                </Col>
            </Row>
        </main>
    );
}

export default Chat;