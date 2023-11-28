import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCopy } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';

function App() {
  const [password, setpassword] = useState("")
  const [charAllowed, setcharAllowed] = useState(false)
  const [numberallowed, setnumberallowed] = useState(false)
  const [length, setlength] = useState(8)
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*()_<>:'{}[],~`"
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)

    }
    setpassword(pass)

  }, [setpassword, charAllowed, numberallowed, length])
  useEffect(() => { passwordgenerator() }, [charAllowed, numberallowed, length])
  const passwordref = useRef(null)
  const copytoclip = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passwordref.current?.select()
  }, [password])

  return (
    <>
      <div className="main">
        <div><h1>Password generator</h1></div>
        <div className="input">
          <input type="text" value={password}
            className="password_area"
            placeholder='password' ref={passwordref} readOnly>


          </input>
          <button className='button' onClick={copytoclip}>  <FontAwesomeIcon icon={faCopy} /></button>

        </div>
        <div className="changes">
          <div className='slider'>
            <input type='range' min={6} max={50} value={length} onChange={(e) => { setlength(e.target.value) }}>

            </input>
            <label>Length({length})</label>
          </div>
          <div>
            <input type='checkbox' defaultChecked={numberallowed} onChange={() => { setnumberallowed((prev) => !prev) }}></input>
            <label>Numbers</label>
          </div>
          <div>
            <input type='checkbox' defaultChecked={charAllowed} onChange={() => { setcharAllowed((prev) => !prev) }}></input>
            <label>Characters</label>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
