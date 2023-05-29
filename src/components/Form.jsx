import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';

const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Form() {
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [passwd, setPasswd] = useState('');
  const [validPasswd, setValidPasswd] = useState(false);
  const [passwdFocus, setPasswdFocus] = useState(false);

  const [matchPasswd, setMatchPasswd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(userRegex.test(user));
  }, [user]);

  useEffect(() => {
    setValidPasswd(passwdRegex.test(passwd));
    setValidMatch(passwd === matchPasswd);
  }, [passwd, matchPasswd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, passwd, matchPasswd]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const isNameValid = userRegex.test(user);
    const isPasswdValid = passwdRegex.test(passwd);
    if (!isNameValid || !isPasswdValid) {
      setErrMsg("Invalid Entry");
      return;
    }
    setSuccess(true);
  }

  return (
    <>
    {
      success
      ? (
        <section className='w-11/12 max-w-lg mx-auto flex flex-col gap-1 items-center bg-white p-8 rounded-md'>
          <div className='bg-green-600 inline-flex justify-center items-center text-2xl text-white w-12 h-12 rounded-full' aria-hidden='true'>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <h1 className='text-3xl font-bold text-center text-green-600'>Success!</h1>
          <p>
            <a href="#" className='bg-gradient-to-r from-blue-500 to-purple-600 text-lg px-6 py-2 inline-flex mt-3 text-white font-semibold rounded-md cursor-pointer'>Sign In</a>
          </p>
        </section>
      )
      : (
        <section className='w-11/12 max-w-lg mx-auto bg-white p-4 rounded-md'>
          <p
            ref={errRef}
            className={`${errMsg ? 'block' : 'sr-only'}`}
            aria-live='assertive'
          >{errMsg}</p>
          <h1 className='text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text' style={{WebkitTextFillColor: 'transparent'}}>Register</h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className='flex gap-1 items-center font-semibold'>
                Username
                <span className={validName ? 'bg-green-600 inline-flex justify-center items-center text-xs text-white w-5 h-5 rounded-full' : 'hidden'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? 'hidden' : 'bg-red-600 inline-flex justify-center items-center text-xs text-white w-5 h-5 rounded-full'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(ev) => setUser(ev.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className='border border-gray-400 rounded-md px-4 py-2'
              />
              <p id="uidnote" className={`${userFocus && user && !validName ? 'relative bg-gray-300 p-2 mt-2 rounded-md before:content-[""] before:absolute before:-top-1 before:left-4 before:w-2 before:h-2 before:rotate-45 before:bg-gray-300' : 'sr-only'}`}>
                <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: '.5rem'}} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className='flex gap-1 items-center font-semibold'>
                Password
                <span className={validPasswd ? 'bg-green-600 inline-flex justify-center items-center text-xs text-white w-5 h-5 rounded-full' : 'hidden'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPasswd || !passwd ? 'hidden' : 'bg-red-600 inline-flex justify-center items-center text-xs text-white w-5 h-5 rounded-full'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(ev) => setPasswd(ev.target.value)}
                required
                aria-invalid={validPasswd ? 'false' : 'true'}
                aria-describedby='passwdnote'
                onFocus={() => setPasswdFocus(true)}
                onBlur={() => setPasswdFocus(false)}
                className='border border-gray-400 rounded-md px-4 py-2'
              />
              <p
                id="passwdnote"
                className={passwdFocus && !validPasswd ? 'relative bg-gray-300 p-2 mt-2 rounded-md before:content-[""] before:absolute before:-top-1 before:left-4 before:w-2 before:h-2 before:rotate-45 before:bg-gray-300' : 'sr-only'}
              >
                <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: '.5rem'}} />
                8 to 24 characters.<br />
                Must include uppercase letters, a number and a special character.<br />
                Allowed special characters: 
                <span aria-label='exclamation mark'>!</span> 
                <span aria-label='at symbol'>@</span> 
                <span aria-label='hash tag'>#</span> 
                <span aria-label='dollar sign'>$</span> 
                <span aria-label='percent'>%</span>
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirm-passwd" className='flex gap-1 items-center font-semibold'>
                Confirm Password
                <span className={validMatch && matchPasswd ? 'bg-green-600 inline-flex justify-center items-center text-xs text-white w-5 h-5 rounded-full' : 'hidden'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPasswd ? 'hidden' : 'bg-red-600 inline-flex justify-center items-center text-xs text-white w-5 h-5 rounded-full'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                name="confirm-passwd"
                id="confirm-passwd"
                onChange={(ev) => setMatchPasswd(ev.target.value)}
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby='cpasswdnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className='border border-gray-400 rounded-md px-4 py-2'
              />
              <p
                id="cpasswdnote"
                className={matchFocus && !matchPasswd ? 'relative bg-gray-300 p-2 mt-2 rounded-md before:content-[""] before:absolute before:-top-1 before:left-4 before:w-2 before:h-2 before:rotate-45 before:bg-gray-300' : 'sr-only'}
              >
                <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: '.5rem'}} />
                Must match the password input field.
              </p>
            </div>


            <button className='bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 w-full text-lg text-white font-semibold rounded-md cursor-pointer' disabled={!validName || !validPasswd || !validMatch ? true : false}>Sign Up</button>
          </form>
          <p className='mt-4 border-t border-t-gray-400 pt-2 text-center font-semibold'>
            Already registered?<br />
            <span>
              {/* # Todo: Put Router Link Here # */}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )
    }
    </>
  );
}

export default Form;