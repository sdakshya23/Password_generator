/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";

import "./App.css";
import { useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAll, setcharAll] = useState(false);
  //jaise hi page load ho hum load karvana hai password
  const [password, setPassword] = useState("");
  const passRef = useRef(null);
  //the use callback takes two inputs a function and dependencies
  //where the function changes or applies the required modifications
  //which are allowed or are required by the dependencies
  //the useCallback() is a react hook that lets you cache a function
  //definition between re-renders
  //ie it stores the successive changes applied and allows more changes
  //that can be applied to the function

  const passGen = useCallback(() => {
    // this stores the generated password inside it
    let pass = "";
    // string stores all A-Z & a-z
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAll) {
      str += "!@#$%^&*";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    //jab jab in 4 mein changes hoga then only the useCallback will call and change the
    // password
  }, [length, numAllowed, charAll, setPassword]);

  // for calling the passgen to get new passwords as soon as the page loads we either can make a button a then set pass or we can also
  // use the useEffect hook that lets you rerender a component based on external components
  // as soon as the dependencies are changed and useEffect reloads the entire page making sure the change is applied

  //KISI BHI CHEEZ KA AGAR REFERANCE LENA HOTA HAI TAB WE USE useRef hook

  const copyPassToClip = useCallback(() => {
    //now this works but for better codepractices we have to also show the user that the text copied should also show some selection
    //i should know that the text is copied and the password in the text field should get highlighted in that case we use the
    //passref that we've created earlier
    //.current is passed optionally as we know that the default value is null and can cause some bugs
    //the below code selects the password after the user has cliked on copy
    passRef.current?.select();
    //to select a given range start and end
    passRef.current?.setSelectionRange(0, 10);

    window.navigator.clipboard.writeText(password);
  }, [password]);
  // jo bhi cheezen interrelated hain interdependent hain unke liye hum unhe same dependencies ke andar useCallback mein daal dete hain
  // like in this case the copy depends on the password hence both are connected so copyfuncion mein we have password as an optimization

  useEffect(() => {
    passGen();
  }, [length, numAllowed, charAll, passGen]);

  return (
    <>
      <div className="w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-700 rounded-lg shadow-md">
        <h1 className="my-3 text-center text-white">Password Generator</h1>
        <div className="flex mb-4 rounded-lg shadow ">
          <input
            type="text"
            value={password}
            placeholder="display pass"
            className="w-full px-3 py-1 rounded-md rounded-r-none outline-none"
            readOnly
            // kabhi bhi kisi bhi object ya text ke reference dene ke liye we use "ref" attribute of any tag
            // the ref uses and has the reference which we have created and based on that it gives us the reference of
            // the object we are asking for like in this case we are asking for the ref of password

            ref={passRef}
          />
          <button
            className="outline-none shrink-0 px-3 py-0.5 bg-blue-700 text-white rounded-r-md
          hover:bg-blue-500"
            onClick={copyPassToClip}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAll}
              id="characterInput"
              onChange={(e) => {
                setcharAll((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numAllowed"
              onChange={(e) => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numAllowed">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
