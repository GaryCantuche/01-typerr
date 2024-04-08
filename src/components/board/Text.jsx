import { useEffect, useContext, useRef, useState } from 'react'
import { BoardContext } from './Board'
import RestartButton from './../../assets/icons/restart.svg'

const Text = props => {
  //const [$input, setInput] = useState(null)
  const $input = useRef(null)
  const { isGameOver, setGameOver } = useContext(BoardContext)
  const { isNewGame, setNewGame } = useContext(BoardContext)
  const { paragraph, newText, initialTime, setFinalValues, wordsNumber } = useContext(BoardContext)
  const [currentTime, setCurrentTime] = useState(initialTime)
  const [keysCounter, setKeysCounter] = useState(0)
  const [keysErrors, setKeysErrors] = useState(0)
  

  useEffect(() => {
    if(isNewGame) {
      startGame()
    }
  }, [isNewGame])

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(currentTime -1);
    }, 1000)

    if(currentTime === 0 || isGameOver) {
      gameOver(interval);
    }

    return () => {
      clearInterval(interval)
    }
  }, [currentTime])

  const gameOver = (interval) => {
    setFinalValues({
      'keysErrors':keysErrors, 
      'keysCounter':keysCounter, 
      'initialTime':initialTime, 
      'lastTime': currentTime,
      'writedWords': document.querySelectorAll('.complete-word').length,
      'totalWords':wordsNumber,
    });  
      clearInterval(interval);
      setGameOver(true);
  }

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
    if($input.current.value.length === $letters.length){
      $letters[$input.current.value.length - 1].classList.add('active', 'is-last')
    }else{
      $letters[$input.current.value.length].classList.add('active')
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
      }else{
        $currentWord.classList.add('complete-word')
      }
      $input.current.value = ''

      //Go to next word
      const $nextWord = $currentWord.nextElementSibling
      if (!$nextWord) {
        gameOver()
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

  const startGame = () => {
    paragraph.current = newText()
    //CLEAN INPUT
    $input.current.value = '';
    $input.current.focus();
    // GET ALL WORDS AND CLEAN CLASSES
    const $word = document.querySelectorAll('.word')
    $word.forEach(word => {
      word.classList.remove('missed-word')
      word.classList.remove('complete-word')
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

  const focusInput = () => {
    if($input) $input.current.focus();
  }

  //console.log('Hola');

  return (
    <div className='p-2'>
      <div className='counters text-3xl flex justify-around sm:justify-between'>
        <div className='text-configuration-buttons'>
          <time>{currentTime}</time>
        </div>
        <div className='flex gap-x-3'>
          <div className='text-green-600' id='key-counter'>{keysCounter}</div>
          <div className='text-red-600' id='errors-counter'>{keysErrors}</div>
        </div>
      </div>

      <div onClick={focusInput} id='text'>
        { paragraph.current ? paragraph.current.split(' ').map((word, index) => {
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
        }):<></>}
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
        autoComplete="one-time-code"
        ref={$input}
      />
    </div>
  )
}

export default Text
