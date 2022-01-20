import React, { useEffect, useState } from 'react';
import './css/header.css';

export function Header() {

  const [day, setDay] = useState(new Date().toLocaleString('en-us', {weekday: 'short'}));
  const [date, setDate] = useState(new Date().getDate() + "/" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear().toString().substring(2));
  const [time, setTime] = useState(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
  const [internetConnection, setInternetConnection] = useState(window.navigator.onLine);

  
  useEffect(() => {

    // Updates time/date/day and internet connection every second
    const interval = setInterval(() => {
      setTime(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
      setDay(new Date().toLocaleString('en-us', {weekday: 'short'}));
      setDate(new Date().getDate() + "/" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear().toString().substring(2));
      setInternetConnection(window.navigator.onLine);
    }, 1000);

    return () => clearInterval(interval)

  }, []);

  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <div className='bar'>
        {/* deif image */}
        <img src='https://deif-cdn-umbraco.azureedge.net/media/4lupp5if/deif-_logo_umbraco.jpg?anchor=center&mode=crop&width=1200&height=630&rnd=132494959600100000&v=4' className='headerLogo' alt="Image not found" />
        {/* Sets internet string to green when connected and red when disconnected */}
        <div className='connection'>{internetConnection === true ? (<span id='test1' style={{color: 'lightgreen'}}>Internet Connected</span>) : (<span style={{color: 'red'}}>Internet Disconnected</span>)}</div>
        <div className='dateTime'>{day + ". " + date + " " + time}</div>

      </div>

    </div>
  );

}