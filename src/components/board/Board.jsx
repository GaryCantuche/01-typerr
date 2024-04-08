import { createContext, useRef, useState } from 'react'
import Text from './Text'
import ConfigurationBar from './ConfigurationBar' 
import wordsList from './../../assets/words/words.json'
import Results from './Results';

export const BoardContext = createContext(null);

function Board () {
  const [isNewGame, setNewGame] = useState(true)
  const [isGameOver, setGameOver] = useState(false)
  const [wordsNumber, setWordsNumber] = useState(30)
  const [initialTime, setInitialTime] = useState(30)
  const [finalValues, setFinalValues] = useState(
    {
      'keysErrors':0, 
      'keysCounter':0, 
      'initialTime':0, 
      'lastTime':0,
      'writedWords':0,
      'totalWords':0 
  })

  let paragraph = useRef(newText())

  function newText (){
    return wordsList.words
      .toSorted(() => Math.random() - 0.5)
      .slice(0, wordsNumber)
      .join(' ')
  }

  return (
    <div className='w-full sm:w-11/12 grid gap-y-8' id='game'>
      <BoardContext.Provider value={{
          "isGameOver":isGameOver,
          "setGameOver":setGameOver,
          "isNewGame":isNewGame,
          "setNewGame":setNewGame,
          "initialTime":initialTime,
          "setInitialTime":setInitialTime,
          "finalValues":finalValues,
          "setFinalValues":setFinalValues,
          "paragraph":paragraph,
          "wordsNumber":wordsNumber,
          "setWordsNumber":setWordsNumber,
          "newText":newText,
      }}>
        <ConfigurationBar />
        {
          isGameOver ? <Results /> : <Text />
        }
      </BoardContext.Provider>
    </div>
  )
}

export default Board
