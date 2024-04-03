import { useEffect, useState } from 'react'
import wordsList from './../../assets/words/words.json'

function Board () {
  const [$input, setInput] = useState(null)
  const [$text, setText] = useState('')
  const [$keys_counter, setKeysCounter] = useState(0)
  const [$keys_errors, setKeysErrors] = useState(0)
  const [isGameOver, setGameOver] = useState(false)
  const [paragraph, setParagraph] = useState(
    wordsList.words
      .toSorted(() => Math.random() - 0.5)
      .slice(0, 32)
      .join(' ')
  )

  useEffect(() => {
    setInput(document.querySelector('#input'))
    setText(document.querySelector('#text'))
    startGame()
  }, [$input, paragraph])

  const onKeyUp = () => {
    if (isGameOver) return
    const $word = document.querySelector('.word.active')
    const currentWord = $word.innerText.split('')
    const $letters = $word.querySelectorAll('.letter')
    const $letter = $word.querySelector('.letter.active')

    $input.maxLength = $letters.length
    $letters.forEach(letter =>
      letter.classList.remove('letter-done', 'letter-wrong', 'is-last')
    )
    $input.value.split('').forEach((char, index) => {
      const isCorrect = char === currentWord[index] ? true : false
      if (isCorrect) {
        $letters[index].classList.add('letter-done')
      } else {
        $letters[index].classList.add('letter-wrong')
      }
    })

    $letter.classList.remove('active', 'is-last')
    if ($letters[$input.value.length]) {
      $letters[$input.value.length].classList.add('active')
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
      if (word !== $input.value) {
        $currentWord.classList.add('missed-word')
      }
      $input.value = ''

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
        $input.value = [
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

  const gameOver = () => {
    setGameOver(true)
  }

  const startGame = () => {
    if ($input) {
      const $word = document.querySelector('.word')
      $word.classList.add('active')
      $word.querySelector('.letter').classList.add('active')
    }
  }

  return (
    <div id='game'>
      <div className='counters'>
        <div id='key-counter'>{$keys_counter}</div>
        <div id='errors-counter'>{$keys_errors}</div>
      </div>
      <div id='text'>
        {paragraph.split(' ').map((word, index) => {
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
      <input
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        type='text'
        id='input'
        autoFocus
        readOnly={isGameOver ? true : false}
      />
    </div>
  )
}

export default Board
