import { createContext, useRef, useState } from 'react'
import Text from './Text'
import ConfigurationBar from './ConfigurationBar' 
import wordsList from './../../assets/words/words.json'

export const BoardContext = createContext(null);

function Board () {
  const [isNewGame, setNewGame] = useState(true)
  const [isGameOver, setGameOver] = useState(false)
  const [keysCounter, setKeysCounter] = useState(0)
  const [keysErrors, setKeysErrors] = useState(0)
  const [initialTime, setInitialTime] = useState(5)
  const [wordsNumber, setWordsNumber] = useState(30)
  const [currentTime, setCurrentTime] = useState(initialTime)

  let paragraph = useRef(wordsList.words
      .toSorted(() => Math.random() - 0.5)
      .slice(0, wordsNumber)
      .join(' '))
  
  return (
    <div id='game'>
      <BoardContext.Provider value={{
          "isGameOver":isGameOver,
          "setGameOver":setGameOver,
          "isNewGame":isNewGame,
          "setNewGame":setNewGame,
          "keysCounter":keysCounter,
          "setKeysCounter":setKeysCounter,
          "keysErrors":keysErrors,
          "setKeysErrors":setKeysErrors,
          "initialTime":initialTime,
          "setInitialTime":setInitialTime,
          "currentTime":currentTime,
          "setCurrentTime":setCurrentTime,
          "paragraph":paragraph,
          //"setParagraph":setParagraph,
          "wordsNumber":wordsNumber,
          "setWordsNumber":setWordsNumber,
      }}>
        <ConfigurationBar />
        <Text />
      </BoardContext.Provider>
    </div>
  )
}

export default Board
