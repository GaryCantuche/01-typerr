import Board from './components/board/Board'
import Navigation from './components/navbar/navigation'

function App () {
  return (
    <main className='w-full p-3 sm:w-3/4 grid gap-y-10 '>
      <Navigation />
      <Board />
    </main>
  )
}

export default App
