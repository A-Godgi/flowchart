import React, {useState} from 'react';
import './assets/scss/style.scss'
import Layout from "./components/Layout";
import Canvas from "./components/Canvas";

function App() {
  const [zoomValue, setZoomValue] = useState(1);
  const [viewport, setViewport] = useState({
    offset: {
      x: 0.0,
      y: 0.0
    }
  });
  return (
    <Layout setViewport={setViewport} zoomValue={zoomValue} setZoomValue={setZoomValue}>
      <Canvas setZoomValue={setZoomValue} zoomValue={zoomValue} viewport={viewport} setViewport={setViewport}/>
    </Layout>
  );
}

export default App;
