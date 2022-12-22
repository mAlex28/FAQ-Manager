import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import {reducers} from "../redux/reducers"
import '../styles/globals.css'

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)))

function MyApp({ Component, pageProps })  {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
export default MyApp
