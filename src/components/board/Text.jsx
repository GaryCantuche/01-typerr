import wordsList from './../../assets/words/words.json'
import { useState, useEffect } from 'react'

const Text = props => {
  const [$input, setInput] = useState(null)
  const { isGameOver, setGameOver } = props
  const { keysCounter, setKeysCounter } = props
  const { keysErrors, setKeysErrors } = props

  const [paragraph, setParagraph] = useState(
    wordsList.words
      .toSorted(() => Math.random() - 0.5)
      .slice(0, 32)
      .join(' ')
  )

  useEffect(() => {
    setInput(document.querySelector('#input'))
    startGame()
  }, [$input, paragraph])

  const onKeyUp = event => {
    const { key } = event
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
        if (key !== 'Backspace') setKeysCounter(keysCounter + 1)
      } else {
        $letters[index].classList.add('letter-wrong')
        if (key !== 'Backspace') setKeysErrors(keysErrors + 1)
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

  const startGame = () => {
    if ($input) {
      const $word = document.querySelector('.word')
      $word.classList.add('active')
      $word.querySelector('.letter').classList.add('active')
    }
  }

  return (
    <div className='text-wrapper'>
      <div className='counters'>
        <div id='key-counter'>{keysCounter}</div>
        <div id='errors-counter'>{keysErrors}</div>
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

export default Text
