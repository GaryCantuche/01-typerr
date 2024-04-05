import { useEffect, useContext, useRef } from 'react'
import { BoardContext } from './Board'
import wordsList from './../../assets/words/words.json'
import RestartButton from './../../assets/icons/restart.svg'

const Text = props => {
  //const [$input, setInput] = useState(null)
  const $input = useRef(null)
  const { isGameOver, setGameOver } = useContext(BoardContext)
  const { isNewGame, setNewGame } = useContext(BoardContext)
  const { keysCounter, setKeysCounter } = useContext(BoardContext)
  const { keysErrors, setKeysErrors } = useContext(BoardContext)
  const { currentTime, setCurrentTime } = useContext(BoardContext)
  const { initialTime } = useContext(BoardContext)
  const { paragraph, wordsNumber } = useContext(BoardContext)

  useEffect(() => {
    $input.current = document.querySelector('#input')
    if(isNewGame) {
      startGame()
    }
  }, [isNewGame])

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(currentTime -1);
    }, 1000)

    if(currentTime === 0) {
      clearInterval(interval);
      setGameOver(true);
    }

    return () => {
      clearInterval(interval)
    }
  }, [currentTime])

  const onKeyUp = event => {
    const { key } = event
    if (isGameOver) return
    const $word = document.querySelector('.word.active')
    const currentWord = $word.innerText.split('')
    const $letters = $word.querySelectorAll('.letter')
    const $letter = $word.querySelector('.letter.active')

    $input.current.maxLength = $letters.length
    $letters.forEach(letter =>
      letter.classList.remove('letter-done', 'letter-wrong', 'is-last')
    )
    $input.current.value.split('').forEach((char, index) => {
      const isCorrect = char === currentWord[index] ? true : false
      if (isCorrect) {
        $letters[index].classList.add('letter-done')
        if (key !== 'Backspace') setKeysCounter(keysCounter + 1)
      } else {
        $letters[index].classList.add('letter-wrong')
        if (key !== 'Backspace') setKeysErrors(keysErrors + 1)
      }
    })

    $letter.classList.remove('active', 'is-last')
    if ($letters[$input.current.value.length]) {
      $letters[$input.current.value.length].classList.add('active')
    } else {
      $letter.classList.add('active', 'is-last')
    }
  }

  const onKeyDown = event => {
    if (isGameOver) return
    const { key } = event
    if (key === ' ') {
      event.preventDefault()
      const $currentWord = document.querySelector('.word.active')
      const $currentLetter = $currentWord.querySelector('.letter.active')
      $currentWord.classList.remove('active')
      $currentLetter.classList.remove('active')

      //Check Missed word
      const word = $currentWord.innerText
      if (word !== $input.current.value) {
        $currentWord.classList.add('missed-word')
      }
      $input.current.value = ''

      //Go to next word
      const $nextWord = $currentWord.nextElementSibling
      if (!$nextWord) {
        setGameOver(true)
        return
      }
      const $nextLetter = $nextWord.querySelector('.letter')
      $nextWord.classList.add('active')
      $nextLetter.classList.add('active')

      return
    }

    if (key === 'Backspace') {
      const $currentWord = document.querySelector('.word.active')
      const $prevWord = $currentWord.previousElementSibling
      const $currentLetter = $currentWord.querySelector('.letter.active')
      const $prevLetter = $currentLetter.previousElementSibling

      if (!$prevWord) return
      const hasMissedLetters = $prevWord.classList.contains('missed-word')
      if (hasMissedLetters && !$prevLetter) {
        $currentWord.classList.remove('active', 'missed-word')
        $currentLetter.classList.remove('active')
        const $letterToGo = $prevWord.querySelector('.letter:last-child')
        $letterToGo.classList.add('active')
        $prevWord.classList.add('active')
        $prevWord.classList.remove('missed-word')
        $input.current.value = [
          ...$prevWord.querySelectorAll(
            '.letter.letter-done,.letter.letter-wrong'
          )
        ]
          .map(el =>
            el.classList.contains('letter-done') ? el.innerText : '*'
          )
          .join('')
      }
    }
  }

  const newText = () => {
    paragraph.current = wordsList.words
      .toSorted(() => Math.random() - 0.5)
      .slice(0, wordsNumber)
      .join(' ')
  }

  const startGame = () => {
    newText()
    //CLEAN INPUT
    $input.current.value = '';
    $input.current.focus();
    // GET ALL WORDS AND CLEAN CLASSES
    const $word = document.querySelectorAll('.word')
    $word.forEach(word => {
      word.classList.remove('missed-word')
      word.querySelectorAll('.letter').forEach(letter => letter.classList.remove('letter-done', 'letter-wrong', 'active', 'is-last'))
    })
    // START
    $word[0].classList.add('active')
    $word[0].querySelector('.letter').classList.add('active')
    
    setNewGame(false)
    setGameOver(false)
    setKeysCounter(0)
    setKeysErrors(0)
    setCurrentTime(initialTime)
  }

  return (
    <div className='text-wrapper'>
      <div className='counters'>
        <div>
          <time>{currentTime}</time>
        </div>
        <div className='word-counters'>
          <div id='key-counter'>{keysCounter}</div>
          <div id='errors-counter'>{keysErrors}</div>
        </div>
      </div>

      <div id='text'>
        {paragraph.current.split(' ').map((word, index) => {
          return (
            <span className='word' key={index}>
              {word.split('').map((letter, index) => {
                return (
                  <span className='letter' key={index}>
                    {letter}
                  </span>
                )
              })}
            </span>
          )
        })}
      </div>
      <div className='restart-wrapper'>
          <div className='restart-button'>
            <button onClick={() => startGame()}>
              <img src={RestartButton} alt='Restart Button'/>
            </button>
          </div>
      </div>
      <input
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        type='text'
        id='input'
        autoFocus
        readOnly={isGameOver ? true : false}
        autocomplete="one-time-code"
      />
    </div>
  )
}

export default Text
