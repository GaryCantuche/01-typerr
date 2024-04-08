import { useContext, useState } from 'react'
import { BoardContext } from './Board'

const SELECTOR_TYPES = ['TIME', 'WORDS'];

function ConfigurationBar () {
  const { setInitialTime } = useContext(BoardContext)
  const { setWordsNumber } = useContext(BoardContext)
  const { setGameOver } = useContext(BoardContext)
  const { setNewGame } = useContext(BoardContext)
  const [selector, setSelector] = useState(SELECTOR_TYPES[0]);

  const changeSelectorValues = (val) => {
    if(SELECTOR_TYPES[0] === selector){
      setInitialTime(val);  
    }
    if(SELECTOR_TYPES[1] === selector){
      setWordsNumber(val)
    }
    setNewGame(true);
    setGameOver(false);
  }

  const changeSelector = (sel) => {
    setSelector(sel);
  }

  console.log(selector);

  return (
    <div className='w-full sm:w-3/4 lg:w-8/12 flex justify-center gap-2 p-2 bg-configuration-back text-configuration-buttons rounded-xl shadow m-auto'>
      <div className={`${selector !== SELECTOR_TYPES[0] ? 'opacity-50' : 'opacity-100'} transition ease-in-out duration-300 hover:text-configuration-buttons hover:opacity-100`}>
        <button
          className="flex gap-1 justify-center items-center outline-none border-none middle none center flex items-center justify-center rounded-lg p-1 transition-all disabled:pointer-events-none"
          data-ripple-light="true"
          onClick={() => changeSelector(SELECTOR_TYPES[0])}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clock-hour-11" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D7D7D3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 12l-2 -3" />
            <path d="M12 7v5" />
          </svg>
        Time
        </button>
      </div>
      <div className={`${selector !== SELECTOR_TYPES[1] ? 'opacity-50' : 'opacity-100'} transition ease-in-out duration-300 hover:text-configuration-buttons hover:opacity-100`}>
        <button
          className={`flex gap-1 justify-center items-center outline-none border-none middle none center flex items-center justify-center rounded-lg p-1 transition-all`}
          data-ripple-light="true"
          onClick={() => changeSelector(SELECTOR_TYPES[1])}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-medium" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D7D7D3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M8 9h1l3 3l3 -3h1" />
            <path d="M8 15l2 0" />
            <path d="M14 15l2 0" />
            <path d="M9 9l0 6" />
            <path d="M15 9l0 6" />
          </svg>
        Words
        </button>
      </div>
      <div className='border border-configuration-buttons/50 mx-2'></div>
      <div className='flex gap-4 justify-center items-center'>
        <button onClick={() => changeSelectorValues(10)} className={`transition ease-in-out duration-300 opacity-50 hover:opacity-100`}>10</button>
        <button onClick={() => changeSelectorValues(20)} className={`transition ease-in-out duration-300 opacity-50 hover:opacity-100`}>20</button>
        <button onClick={() => changeSelectorValues(30)} className={`transition ease-in-out duration-300 opacity-50 hover:opacity-100`}>30</button>
        <button onClick={() => changeSelectorValues(40)} className={`transition ease-in-out duration-300 opacity-50 hover:opacity-100`}>40</button>
      </div>
    </div>
  )
}

export default ConfigurationBar
