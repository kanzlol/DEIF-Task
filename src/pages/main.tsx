import React, { useEffect, useState } from 'react';
import { Header } from '../components/header';
import './css/main.css'
import Api from '../api/api';
import { Link } from 'react-router-dom';
import GaugeChart from 'react-gauge-chart';
import useWindowDimensions from '../hooks/windowDimensions';


export function MainView() {

  const defaultValues = {
    AvailablePowerPMS: 0,
    GeneratorPowerTotal: 0,
    Speed: 0,
    TotalFuelLevel: 0,
    Volt: 0,
    TimeActive: 0,
    Hz: 0
  }

  interface Data {
    AvailablePowerPMS: Number,
    GeneratorPowerTotal: Number,
    Speed: Number,
    TotalFuelLevel: Number,
    Volt: Number,
    TimeActive: Number,
    Hz: Number
  }

  const [genset1, setGenset1] = useState<Data>(defaultValues);
  const [genset2, setGenset2] = useState<Data>(defaultValues);
  const [genset3, setGenset3] = useState<Data>(defaultValues);
  const [genset4, setGenset4] = useState<Data>(defaultValues);
  const [total, setTotal] = useState<Data>(defaultValues);

  const { width } = useWindowDimensions();
  
  useEffect(() => {
    
    const api = Api.getGenset();
    api.then( (result) => {
      
      console.log(result);
      setGenset1(result.genset1);
      setGenset2(result.genset2);
      setGenset3(result.genset3);
      setGenset4(result.genset4);

      // Calculates totals and averages
      setTotal(
        {
          AvailablePowerPMS: result.genset1.AvailablePowerPMS + result.genset2.AvailablePowerPMS + result.genset3.AvailablePowerPMS + result.genset4.AvailablePowerPMS, 
          GeneratorPowerTotal: result.genset1.GeneratorPowerTotal + result.genset2.GeneratorPowerTotal + result.genset3.GeneratorPowerTotal + result.genset4.GeneratorPowerTotal, 
          Speed: (result.genset1.Speed + result.genset2.Speed + result.genset3.Speed + result.genset4.Speed) / 4, 
          TotalFuelLevel: (result.genset1.TotalFuelLevel + result.genset2.TotalFuelLevel + result.genset3.TotalFuelLevel + result.genset4.TotalFuelLevel) / 4,
          Volt: 0,
          TimeActive: 0,
          Hz: 0
        }
      );

    });

  }, []);

  // Takes input of Data object type to create gauge chart of total fuel levels
  const createChart = (data: Data) => {

    const totalFuelLevel = data.TotalFuelLevel.valueOf() / 10;

    // If total fuel level is lower than 20% text color will be highlighted with red
    if(totalFuelLevel <= 20) {
      return (
        <td className='data'>
          <GaugeChart id="gauge-chart1"
            nrOfLevels={10}
            percent={data.TotalFuelLevel.valueOf()/1000}
            textColor='#FF0000'
            colors={['#FF0000', '#FF3900', '#FF7100', '#FFAA00', '#FFE300', '#E3FF00', '#AAFF00', '#71FF00', '#39FF00', '#00FF00']}
            style={{width: '15%', display: 'block', margin: 'auto', position: 'absolute'}}  
            animate    
          />
        </td>
      )
    }
    else {
      return (
        <td className='data'>
          <GaugeChart id="gauge-chart1"
            nrOfLevels={10}
            percent={data.TotalFuelLevel.valueOf()/1000}
            textColor='#499E24'
            colors={['#FF0000', '#FF3900', '#FF7100', '#FFAA00', '#FFE300', '#E3FF00', '#AAFF00', '#71FF00', '#39FF00', '#00FF00']}
            style={{width: '15%', display: 'block', margin: 'auto', position: 'absolute'}}  
            animate    
          />
        </td>
      )
    }
  }

  return (
    <div>
      <Header />
      <div className='mainWindow'>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                <Link className='link' to={'/detailed/Genset1'} state={{state: genset1}}>Genset 1</Link>
              </th>
              <th>
              <Link className='link' to={'/detailed/Genset2'} state={{state: genset2}}>Genset 2</Link>
              </th>
              <th>
              <Link className='link' to={'/detailed/Genset3'} state={{state: genset3}}>Genset 3</Link>
              </th>
              <th>
              <Link className='link' to={'/detailed/Genset4'} state={{state: genset4}}>Genset 4</Link>
              </th>
              <th>Total</th>
            </tr>
            <tr className='mainTableRow'>
              <td className='info'>Available power PMS</td>  
              <td className='data'>{genset1.AvailablePowerPMS + " kW"}</td>
              <td className='data'>{genset2.AvailablePowerPMS + " kW"}</td>
              <td className='data'>{genset3.AvailablePowerPMS + " kW"}</td>
              <td className='data'>{genset4.AvailablePowerPMS + " kW"}</td>
              <td className='data'>{total.AvailablePowerPMS + " kW"}</td>
            </tr>
            <tr className='break'></tr>
            <tr className='mainTableRow'>
              <td className='info'>Generator power total</td>  
              <td className='data'>{genset1.GeneratorPowerTotal + " kW"}</td>
              <td className='data'>{genset2.GeneratorPowerTotal + " kW"}</td>
              <td className='data'>{genset3.GeneratorPowerTotal + " kW"}</td>
              <td className='data'>{genset4.GeneratorPowerTotal + " kW"}</td>
              <td className='data'>{total.GeneratorPowerTotal + " kW"}</td>
            </tr>
            <tr className='break'></tr>
            <tr className='mainTableRow'>
              <td className='info'>Speed</td>  
              <td className='data'>{genset1.Speed + " rpm"}</td>
              <td className='data'>{genset2.Speed + " rpm"}</td>
              <td className='data'>{genset3.Speed + " rpm"}</td>
              <td className='data'>{genset4.Speed + " rpm"}</td>
              <td className='data'>{total.Speed + " rpm"}</td>
            </tr>
            <tr className='break'></tr>
            <tr className='mainTableRow'>
              <td className='info' >Total fuel level</td>
              {/* Uses gauge chart as long the window width is above 550 pixels */}
              {
                width > 550 && (
                  createChart(genset1)
                )
              }
              {
                width <= 550 && (
                  <td className='data'>{genset1.TotalFuelLevel.valueOf()/10} %</td>
                )
              }
              {
                width > 550 && (
                  createChart(genset2)
                )
              }
              {
                width <= 550 && (
                  <td className='data'>{genset2.TotalFuelLevel.valueOf()/10} %</td>
                )
              }
              {
                width > 550 && (
                  createChart(genset3)
                )
              }
              {
                width <= 550 && (
                  <td className='data'>{genset3.TotalFuelLevel.valueOf()/10} %</td>
                )
              }
              {
                width > 550 && (
                  createChart(genset4)
                )
              }
              {
                width <= 550 && (
                  <td className='data'>{genset4.TotalFuelLevel.valueOf()/10} %</td>
                )
              }
              {
                width > 550 && (
                  createChart(total)
                )
              }
              {
                width <= 550 && (
                  <td className='data'>{total.TotalFuelLevel.valueOf()/10} %</td>
                )
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

}