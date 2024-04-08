import Board from './components/board/Board'
import Footer from './components/footer/Footer'
import Navigation from './components/navbar/navigation'

function App () {
  return (
    <main className='w-full p-0 flex justify-center'>
      <div className='sm:w-3/4 grid gap-y-10 p-3'>
        <Navigation />
        <Board />
      </div>
      <Footer />
    </main>
  )
}

export default App
