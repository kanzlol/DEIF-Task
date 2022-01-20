import { Link } from 'react-router-dom';
import background from '../images/DEIF-color.jpg'
import './css/login.css'

export function Login() {

  const backgroundStyle = {
    background: `url(${background})`, 
    backgroundSize: '100% 100%', 
    height: '0', 
    paddingBottom: '55.89%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }

  return(
    <div style={backgroundStyle}>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <div className='innerBox'>
        <div className='headerBox'>
          <span className='headerText'>Sign in</span>
          <form>
            <label>Username </label><input className='inputField' />
            <br />
            <label>Passcode </label><input className='inputField' type='password' />
            <br />
            <Link className='btn' to={'/main'}>Ok</Link>
          </form>
        </div>
      </div>
    </div>
  );

}