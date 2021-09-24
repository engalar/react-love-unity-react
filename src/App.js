import './App.css';
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Button, Checkbox, Divider, Layout, List } from 'antd';

import 'antd/dist/antd.css';

const { Header, Footer, Sider, Content } = Layout;



const BASE_NAME = 'unity3d/Build/unity3d.';

const unityContext = new UnityContext({
  loaderUrl: `${BASE_NAME}loader.js`,
  dataUrl: `${BASE_NAME}data`,
  frameworkUrl: `${BASE_NAME}framework.js`,
  codeUrl: `${BASE_NAME}wasm`,
});

function spawnEnemies(e) {
  console.log(e.target.value, e.target.checked ? "StartShake" : "StopShake");
  unityContext.send(e.target.value, e.target.checked ? "StartShake" : "StopShake");
}

function App() {
  const [userName, setUserName] = useState("");

  useEffect(function () {
    unityContext.on("ClickObject", function (name, score) {
      setUserName(name);
    });
  }, []);

  return (
    <div>
      <Layout>
        <Header>IOT demo</Header>
        <Layout>
          <Content>
            <Unity style={{ height: 600, width: 600 }} unityContext={unityContext} />
          </Content>
          <Sider>
            {<p>{`你选择了管道 ${userName}`}</p>}
            <List>
              <List.Item><Checkbox value="pipe1" onChange={spawnEnemies}></Checkbox></List.Item>
              <List.Item><Checkbox value="pipe2" onChange={spawnEnemies}></Checkbox></List.Item>
              <List.Item><Checkbox value="pipe3" onChange={spawnEnemies}></Checkbox></List.Item>
              <List.Item><Checkbox value="pipe4" onChange={spawnEnemies}></Checkbox></List.Item>
              <List.Item><Checkbox value="pipe5" onChange={spawnEnemies}></Checkbox></List.Item>
            </List>
            <Divider></Divider>
            <Button onClick={() => {
              unityContext.send('colorCube', 'BlueMe');
            }}>绿色</Button>
            <Button onClick={() => {
              unityContext.send('colorCube', 'RedMe');
            }}>乳白</Button>
          </Sider>
        </Layout>
        <Footer>Powered by mendix</Footer>
      </Layout>
    </div >
  );
}

export default App;
