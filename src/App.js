import { useState } from 'react'
import Menu from './components/Menu'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const initialNotification = {
    message: null,
    type: 'success', // success / error / alert
    timeout: null
  }
  const [notification, setNotification] = useState(initialNotification)
  const addNotification = (message, type, timeInSeconds) => {
    if (notification.timeout) clearTimeout(notification.timeout)
    setNotification({
      message,
      type,
      timeout: setTimeout(
        () => { setNotification(initialNotification) }, 
        timeInSeconds*1000
      )
    })
  }

  const addNew = (anecdote) => {
    console.log(anecdote)
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    addNotification(`New anecdote "${anecdote.content}" created`, 'success', 5)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu notification={notification} anecdotes={anecdotes} addNew={addNew} />
      <Footer />
    </div>
  )
}

export default App