import { useState } from 'react'
import list from './assets/images/icon-list.svg'
import success from './assets/images/icon-success.svg'
import desktop from './assets/images/illustration-sign-up-desktop.svg'
import mobile from './assets/images/illustration-sign-up-mobile.svg'

function App() {
  const [isCompleted, setIsCompleted] = useState(false)

  const listItems = ['Product discovery and building what matters', 'Measureing to ensure updates are a success', 'and much more!']

  return (
    <main>



      {listItems.map(item => {
        return <li>{item}</li>
      })}
    </main>
  )
}

export default App
