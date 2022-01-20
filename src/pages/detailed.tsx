import { useLocation, useNavigate } from 'react-router-dom';
import { Header} from '../components/header';
import './css/detailed.css';

export function DetailedView() {

  interface Data {
    AvailablePowerPMS: Number,
    GeneratorPowerTotal: Number,
    Speed: Number,
    TotalFuelLevel: Number,
    Volt: Number,
    TimeActive: Number,
    Hz: Number
  }

  interface StateObject {
    state: Data
  }

  const location = useLocation();
  const { state } = location.state as StateObject;
  const navigate = useNavigate();

  // Finds the last param of url and adds space between the last letter to use as name
  const pathParam = location.pathname.split('/')[2];
  const name = pathParam.substring(0, 6) + " " + pathParam.substring(6);

  return (
    <div>
      <Header />
      <button className='backBtn' onClick={() => navigate(-1)}>
        <span className='backText'>Back</span>
      </button>
      <br />
      <div className='detailedWindow'>
        <table>
          <tbody>
            <tr>
              <th className='detailedTh'>{name}</th>
            </tr>
            <tr className='detailedTableRow'>
              <td className='detailedData'>
                <pre>Available power PMS</pre>
                {state.AvailablePowerPMS} kW
              </td>
              <td className='detailedData'>
                <pre>Generator power total</pre>
                {state.GeneratorPowerTotal} kW
              </td>
              <td className='detailedData'>
                <pre>Volt</pre>
                {state.Volt} V
              </td>
            </tr>
            <tr className='detailedTableRow'>
              <td className='detailedData'>
                <pre>Hz</pre>
                {state.Hz} Hz
              </td>
              <td className='detailedData'>
                <pre>Speed</pre>
                {state.Speed} rpm
              </td>
              <td className='detailedData'>
                <pre>Total fuel level</pre>
                {state.TotalFuelLevel.valueOf() / 10} %
              </td>
            </tr>
            <tr className='detailedTableRow'>
              <td className='detailedData'>
                <pre>Time active</pre>
                {state.TimeActive} hours
              </td>
              <td className='dataBtn'>
                <pre>Auto</pre>
                Mode of genset
              </td>
              <td className='dataBtn'>
                <pre>Alarm</pre>
                Alarm
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

}