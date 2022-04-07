import { useState } from 'react';
import FloatingBall from 'react-floating-ball';
import { HexColorPicker } from 'react-colorful';
import Select from 'react-select';
import Slider from 'rc-slider';
import debounce from 'lodash.debounce';
import 'rc-slider/assets/index.css';
import './styles.css';

const options = [
  { value: 'top left', label: '左上(top left)' },
  { value: 'bottom left', label: '左下(bottom left)' },
  { value: 'top right', label: '右上(top right)' },
  { value: 'bottom right', label: '右下(bottom right)' },
];

export default function App() {
  const [color, setColor] = useState('#61dafb');
  const [position, setPosition] = useState('top left');
  const [H, setH] = useState(0);
  const [V, setV] = useState(0);

  const handleSiderChange = debounce((val, type) => {
    if (type === 'H') {
      setH(val);
      setPosition(`${val} ${V}`);
      return;
    }
    setV(val);
    setPosition(`${H} ${val}`);
  }, 500);

  return (
    <div className='app'>
      <div className='title-box'>
        <div className='title'>主题色(theme)</div>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
      <div className='title-box'>
        <div className='title'>初始位置(position)</div>
        <div className='positon-wrapper'>
          <div className='slider-wrapper'>
            <Slider
              vertical
              reverse
              style={{ height: 140 }}
              onChange={(val) => handleSiderChange(val, 'H')}
            />
            <Slider
              style={{ marginTop: 12, width: 150 }}
              onChange={(val) => handleSiderChange(val, 'V')}
            />
          </div>
          <div className='select-wrapper'>
            <Select options={options} onChange={(e) => setPosition(e.value)} />
          </div>
        </div>
      </div>
      <FloatingBall
        theme={color}
        position={position}
        events={[
          { icon: 'H', text: 'home', handle: (e) => console.log(e) },
          {
            icon: 'O',
            text: 'home2',
            handle: (e) => console.log(e),
          },
          {
            icon: 'M',
            text: 'home3',
            handle: (e) => console.log(e),
          },
        ]}
      />
    </div>
  );
}
