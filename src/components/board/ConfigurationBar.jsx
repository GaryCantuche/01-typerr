import fifteenSeconds from './../../assets/icons/15ms.svg'
import thirtySeconds from './../../assets/icons/30ms.svg'
import fortySeconds from './../../assets/icons/45ms.svg'
import { useContext } from 'react'
import { BoardContext } from './Board'

function ConfigurationBar (props) {
  const { setInitialTime } = useContext(BoardContext)
  const { setWordsNumber } = useContext(BoardContext)
  const { setGameOver } = useContext(BoardContext)
  const { setNewGame } = useContext(BoardContext)

  const changeSeconds = seconds => {
    setInitialTime(seconds);
    setNewGame(true);
    setGameOver(false);
  }

  const changeQuantityWords = quantity => {
    setWordsNumber(quantity)
    setNewGame(true);
    setGameOver(false);
  }

  return (
    <div className='configuration-bar'>
      <div className='configuration-bar-buttons'>
		Time
        <button
          className='configuration-bar-buttons-button'
          onClick={() => changeSeconds(15)}
        >
          <img alt={'icon'} src={fifteenSeconds} />
        </button>
        <button
          className='configuration-bar-buttons-button'
          onClick={() => changeSeconds(30)}
        >
          <img alt={'icon'} src={thirtySeconds} />
        </button>
        <button
          className='configuration-bar-buttons-button'
          onClick={() => changeSeconds(45)}
        >
          <img alt={'icon'} src={fortySeconds} />
        </button>
      </div>
	  <div className='configuration-bar-buttons'>
		Q. Words
        <button
          className='configuration-bar-buttons-button'
          onClick={() => changeQuantityWords(15)}
        >
          <img alt={'icon'} src={fifteenSeconds} />
        </button>
        <button
          className='configuration-bar-buttons-button'
          onClick={() => changeQuantityWords(30)}
        >
          <img alt={'icon'} src={thirtySeconds} />
        </button>
        <button
          className='configuration-bar-buttons-button'
          onClick={() => changeQuantityWords(45)}
        >
          <img alt={'icon'} src={fortySeconds} />
        </button>
      </div>
    </div>
  )
}

export default ConfigurationBar
