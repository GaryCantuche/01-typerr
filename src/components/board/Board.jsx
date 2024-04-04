import { useEffect, useState } from 'react'
import wordsList from './../../assets/words/words.json'
import Text from './Text'

function Board () {
  const [isGameOver, setGameOver] = useState(false)
  const [keysCounter, setKeysCounter] = useState(0)
  const [keysErrors, setKeysErrors] = useState(0)

  return (
    <div id='game'>
      <Text
        isGameOver={isGameOver}
        setGameOver={setGameOver}
        keysCounter={keysCounter}
        setKeysErrors={setKeysErrors}
        keysErrors={keysErrors}
        setKeysCounter={setKeysCounter}
      />
    </div>
  )
}

export default Board
