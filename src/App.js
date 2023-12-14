import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []); 

  return windowSize;
}


function App() {
  const window = useWindowSize();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(-1);
  const [senstop, setSenstop] = useState(1);
  const [sensleft, setSensleft] = useState(1);
  const images = require.context('./assets', true);
  const imageList = images.keys().map(image => images(image));
  const [image, setimage] = useState(0);
  console.log(imageList);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLeft(left + sensleft);
      setTop(top + senstop);
      if (top > window.height - (100 + 1)) {
        setSenstop(-1);
        setimage(Math.floor(Math.random() * imageList.length));
      }
      if (left > window.width - (100)) { 
        setSensleft(-1);
        setimage(Math.floor(Math.random() * imageList.length));
      }
      if (top <= -1){
        setSenstop(1);
        setimage(Math.floor(Math.random() * imageList.length));
      }
      if (left <= 0){
        setSensleft(1);
        setimage(Math.floor(Math.random() * imageList.length));
      }
    }, 10);
    return () => clearInterval(intervalId);
  }, [left, top]); 
  return (
    <div className="App">
      <div style={{backgroundColor : 'black', width : window.width, height : window.height}}>
          <div style={{left : left, top : top, position : "absolute"}} >
          <img style={{width : 100, height : 100}} src={imageList[image]}></img>
          {/* <span>{window.height} , {window.width}</span> */}
          </div>
        </div>
    </div>
  );
}

export default App;
