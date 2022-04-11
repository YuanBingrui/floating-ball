import { useState } from 'react';
import FloatingBall from 'react-floating-ball';
import { HexColorPicker } from 'react-colorful';
import Select from 'react-select';
import Slider from 'rc-slider';
import InputNumber from 'rc-input-number';
import debounce from 'lodash.debounce';
import 'rc-input-number/assets/index.css';
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
  const [column, setColumn] = useState(2);

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
      <div>
        <div className='title-box title-box-margin'>
          <div className='title'>主题色(theme)</div>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <div className='title-box title-box-margin'>
          <div className='title'>初始位置(position)</div>
          <div className='positon-wrapper'>
            <div className='slider-wrapper'>
              <div className='slider-and-select'>
                <Slider
                  vertical
                  reverse
                  style={{ height: 155 }}
                  onChange={(val) => handleSiderChange(val, 'H')}
                />
                <div className='select-wrapper'>
                  <Select
                    options={options}
                    onChange={(e: any) => setPosition(e.value)}
                  />
                </div>
              </div>
              <Slider
                style={{ marginTop: 12, width: 200 }}
                onChange={(val) => handleSiderChange(val, 'V')}
              />
            </div>
          </div>
        </div>
        <div className='title-box'>
          <div className='title'>列数(column)</div>
          <div className='title-body'>
            <InputNumber value={column} min={1} max={7} onChange={setColumn} />
          </div>
        </div>
      </div>
      <div className='introduce-box'>
        <h1 className='introduce'>Floating Ball</h1>
        <h2 className='introduce-desc'>
          A floating ball component for React and Vue3.
        </h2>
        <div className='about-link'>
          <a href='https://github.com/YuanBingrui/floating-ball'>Github</a>
          <a href='https://www.npmjs.com/package/react-floating-ball'>NPM</a>
        </div>
      </div>
      <FloatingBall
        theme={color}
        position={position}
        column={column}
        events={[
          { icon: 'H', text: 'homeeeee', handle: (e) => console.log(e) },
          {
            icon: 'O',
            text: 'hhhhhhome2',
            handle: (e) => console.log(e),
          },
          {
            icon: 'M',
            text: 'home3',
            handle: (e) => console.log(e),
          },
          {
            icon: 'M4',
            text: 'home4',
            handle: (e) => console.log(e),
          },
          {
            icon: 'M5',
            text: 'home5',
            handle: (e) => console.log(e),
          },
        ]}
      />
    </div>
  );
}
