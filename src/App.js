import React from 'react';
import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [square, setSquare] = useState(Array(9).fill(0))
  const [turn, setTurn] = useState(2);
  useEffect(()=>{
    if(verifyWinner(square))
    {
      alert(`Player ${ turn } WINS!`)
      setSquare(square.fill(0,0,9))
      setTurn(2);
    }
  },[square,turn])
  return (
    <div className="App">
      {square.map((actual,index)=>{
        let retornable = <Square square={actual} index={index} onClickHandler={()=>{let squareMod = [...square];squareMod[index]=turn;setSquare(squareMod);setTurn(turn === 1 ? 2 : 1);}}/>
        if((index) % 3 === 0)
        { 
          return (<span key={index}><br/>{retornable}</span>)
        }
        else 
        {
          return <span key={index}>{retornable}</span>
        }
      })}
    </div>
  );
}
const verifyWinner = (square) => 
{
  const winnerLines = 
  [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  return winnerLines.some((actual) => {
    if(actual.some((n)=>{
      return square[n]===0
    }))
    {
      return false
    }
    else{
      
      return square[actual[0]] === square[actual[1]]&& square[actual[1]] === square[actual[2]]
    }
      
  })
}

const Square = (props) =>  {
  const [disable, setDisable] = useState(false);
  useEffect(()=>{
    if(props.square === 0)
    {
      setDisable(false)
    }
  },[props.square])
  const clickHandler = () => {
      props.onClickHandler()
      setDisable(true);
    
    
  }
  return (
    <span>
      <button onClick={clickHandler} disabled={disable}>
        {props.square === 1 ? "X" : props.square === 2 ? "O" : props.index}
      </button>
    </span>
  )
}
export default App;
