import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import SCPanel from './scPanel'

function App() {

  const inst_foolin = [
    {
      label: "周波数", argName: "freq",
      min: 100, max: 1000, step: 0.01, default: 330,
    },
    {
      label: "ハーモニクス", argName: "numharm",
      min: 0.0, max: 1000.0, step: 0.01, default: 200,
    },
  ]

  const inst_noise = [
    {
      label: "周波数", argName: "freq",
      min: 100, max: 1000, step: 0.01, default: 330,
    },
    {
      label: "コード音量", argName: "amp_cord",
      min: 0.0, max: 1.0, step: 0.01, default: 0.08,
    },
    {
      label: "ノイズ音量", argName: "amp_wn",
      min: 0.0, max: 1.0, step: 0.01, default: 0.54,
    },
    {
      label: "ゆらぎ強さ", argName: "mix_waving",
      min: 0.0, max: 1.0, step: 0.01, default: 1.0,
    },
    {
      label: "鋸波ミックス", argName: "mix_saw",
      min: 0.0, max: 1.0, step: 0.01, default: 0.5,
    },
    {
      label: "LPF freq", argName: "lpf_freq",
      min: 10.0, max: 10000.0, step: 0.01, default: 440.0,      
    },
    {
      label: "LPF dry/wet", argName: "lpf_mix",
      min: 0.0, max: 1.0, step: 0.005, default: 0.0,
    },

  ]

  const inst_hosoo = [
    {
      label: "Freq", argName: "freq_1",
      min: 100, max: 1000.0, step: 0.01, default: 0.1,
    },
    {
      label: "Volume", argName: "vol",
      min: 0.0, max: 1.0, step: 0.01, default: 0.1,
    },
    {
      label: "mix1", argName: "pm_a",
      min: 0.0, max: 1.0, step: 0.01, default: 0.1,
    },
    {
      label: "mix2", argName: "pm_b",
      min: 0.0, max: 1.0, step: 0.01, default: 0.1,
    },
    {
      label: "mix3", argName: "pm_c",
      min: 0.0, max: 1.0, step: 0.01, default: 0.1,
    },
    {
      label: "mix4", argName: "pm_d",
      min: 0.0, max: 1.0, step: 0.01, default: 0.1,
    },
  ]

  return (
    <div className="App">
      <header className="App-header">
        
        <SCPanel synName="undulation" synNum={1000} args={inst_noise}/>
        {/* <SCPanel synName="Synth" synNum={1002} args={inst_hosoo} /> */}
        {/* <SCPanel synName="singrain" synNum={1001} args={inst_foolin} /> */}

      </header>
    </div>
  );
}

export default App;