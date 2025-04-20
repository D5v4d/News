import { Provider } from 'react-redux'
import { store } from './redux/store'
import News from './components/News'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <News />
    </Provider>

  )
}

export default App
