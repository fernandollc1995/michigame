import React, { useEffect, useState } from 'react';
import './App.css';
import db from "./firebase";
function Title() {
  const [titulo, setTitulo] = useState([]);
  useEffect(() => {
    // console.log(db.collection('Titulo').onSnapshot);
    db.collection('michi').doc("xLZtrCPDLHpbAAWp8okN").onSnapshot(snapshot => (
      setTitulo(snapshot.docs.map(doc =>
        ({
          id: doc.id,
          data: doc.data()
        })
      ))
    ));
    console.log(titulo);
  }, []);

  return (
    <header>
      <h1>Juego de Michi</h1>
      {/* <h2>{titulo}</h2> */}
      {/* {titulo.map( titles => (
        <h2 key={titles.id}>{titles.data.tituloPrincipal}</h2>
      ))} */}
    </header>
  )
}

function calculateWinner(squares) {
  const secuence_ganadora = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < secuence_ganadora.length; i++) {
    let [a, b, c] = secuence_ganadora[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    db.collection('michi').doc("xLZtrCPDLHpbAAWp8okN").onSnapshot( (doc) => {
      setSquares(doc.data().arreglomichi);
      setIsNext(doc.data().xIsNext);
      const tmpState = doc.data().xIsNext ? 'X' : 'O';
      setStatus("Le toca a: " + tmpState);
      if (calculateWinner(doc.data().arreglomichi)) {
        // updateSquaresOnFirebase(squares);
        setStatus("El ganador es: " + calculateWinner(doc.data().arreglomichi));
      }
    });
  }, []);


  const updateSquaresOnFirebase =(squares) =>{
    db.collection("michi").doc("xLZtrCPDLHpbAAWp8okN").set({
      arreglomichi: squares
    },{merge:true})
  }

  const updateXIsNextOnFirebase =(xIsNext) =>{
    db.collection("michi").doc("xLZtrCPDLHpbAAWp8okN").set({
      xIsNext: xIsNext
    },{merge:true})
  }

  const handleClick = (i) => {
    const tmpSquares = squares.slice();
    if (tmpSquares[i] || calculateWinner(tmpSquares)) return;
    tmpSquares[i] = isNext ? 'X' : 'O';
    updateXIsNextOnFirebase(!isNext);
    updateSquaresOnFirebase(tmpSquares);
  }


  let renderSquare = (i) => {
    return (
      <Square
        onClick={() => { handleClick(i) }}
        value={squares[i]}
      />
    );
  }
  return (
    <div>
      <div className="board--row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board--row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board--row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {status}

    </div>
  )
}


function Square(props) {
  return (
    <button onClick={() => {
      props.onClick()
    }} className="square">
      {props.value}
    </button>
  )
}

function Game(props) {


  return (
    <Board />
  )
}

const clearData = ()=>{
  const arrayNull= Array(9).fill(null);
  db.collection("michi").doc("xLZtrCPDLHpbAAWp8okN").set({
    arreglomichi: arrayNull
  },{merge:true})
  .then(()=>{
    console.log("Limpiado exitosamente");
  })
  .catch( (error)=>{
    console.error("Error capturado", error)
  })
}

function App() {
  return (
    <div className="App">
      {/* <Title /> */}
      <Game />
      <button onClick={clearData}>Limpiar datos</button>
    </div>
  );
}

export default App;
