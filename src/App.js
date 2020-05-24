import React from 'react';
import {Form, Input, Layout} from 'antd';
import Sources from './components/Sources';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import './App.css';
import Container from "./components/Container";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {


    return (
        <Layout style={{ height: '100vh' }}>
          <Sider>

            <Sources {...this.props} />
          </Sider>
            <Layout>
                <Header style={{ background: '#fff', paddingLeft: 24 }}></Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff' }}>
                    <Container {...this.props} />
                </div>
            </Content>
            </Layout>
        </Layout>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
