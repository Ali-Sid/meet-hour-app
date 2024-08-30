import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins"
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
