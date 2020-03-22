import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NumberForm from './Form.js';
import Guess from './Guess.js';
import thumbsUp from './thumbsup.png';

function App() {
  let [entries, setEntries] = useState(/* 0 */[5,9,6]);
  let [guesses, setGuesses] = useState([[5,6,0]])

  const reset = () => {
    setEntries(0);
    setGuesses([])
  }

  let endOfPage = useRef(null);
  useEffect(()=> {
    setTimeout(() => {
      endOfPage.current.scrollIntoView({behavior: "smooth"})
    }, 350);
  }, [guesses])

 /*  const checkValue = (value, idx) => {
    if (value === entries[idx])
        return 'bull'
    if (entries.includes(value))
    return 'cow'
    return '';
}  */

const checkGuess = (values) => {
  let res = {bull: 0, cow: 0};
  values.forEach((v,idx,arr) =>{
    if (arr.indexOf(v) !== idx)
      return;
    if (v === entries[idx])
      res.bull++;
    else if (entries.includes(v))
      res.cow++
  })
  return res;
}

const randomizeEntries = (amount) => {
  let entries = []
  for (let i=0; i<amount; i++){
    let rand = getRandomDigit();
    while (entries.includes(rand)){
      rand = getRandomDigit()
    }
    entries.push(rand);
  }
  return entries;
}
  let jsx;
  if (!entries)
    jsx = <div>
      <h2>כמה מספרים להגריל?</h2>
      <NumberForm
        numOfEntries={1}
        validator={(v) => v < 1 || v > 5}
        handleSubmit={(...v) => setEntries(randomizeEntries(parseInt(v)))} />
    </div>
  else{
    let won = false;
    let guessWithRes = [];
    guesses.forEach((g,i) => {
      let res = checkGuess(g)
      won = res.bull === entries.length;
      guessWithRes.push({guess: g, res})
    })
    jsx=
    <div>
      <Guess values={entries.map(e => won ? e : '*')} classes={entries.map(e => '')}/>
      <div><button onClick={reset}>reset</button></div>
      {guessWithRes.map((gr, idx) => <Guess key={idx} values={gr.guess} res={gr.res} />)}
      { !won ? <NumberForm
        numOfEntries={entries.length}
        validator={(v) => v < 0 || v > 9}
        handleSubmit={(v) => setGuesses([...guesses, v])} />
        : 
        <img className="thumbsup" src={thumbsUp} alt="good job"/>}
      </div>
  }
  return <div>
  {jsx}
  <div ref={endOfPage} />
  </div>;
}


function getRandomDigit(){
  return Math.floor(Math.random() * 10);
}

export default App;
