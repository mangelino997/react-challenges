import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import TerminosCondicionesModal from './components/TermsModal'
import { fetchData } from './api/fetchData'
import { ACCEPT_TERMS } from './const/endpoints'
import Cookies from 'universal-cookie'

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [tycAccepted, setTycAccepted] = useState(false)

  let userId = localStorage.getItem('userId')

  const openModal = (): void => {
    setShowModal(true)
  }

  const closeModal = (): void => {
    setShowModal(false)
  }

  const handleAcceptTerms = async (): Promise<any> => {
    await fetchData(ACCEPT_TERMS, String(userId))
      .then(resp => {
        console.log(resp)
        if (resp.status === 200) {
          const cookies = new Cookies()
          cookies.set('acceptedTerms', 'true', { maxAge: 900000, path: '/' })
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const checkTermsAccepted = (): void => {
    const cookies = new Cookies()
    const acceptedTerms = cookies.get('acceptedTerms')

    if (acceptedTerms === true) {
      setTycAccepted(true)
      console.log('Los términos y condiciones han sido aceptados')
    } else {
      setTycAccepted(false)
      console.log('Los términos y condiciones aún no han sido aceptados')
    }
  }

  useEffect(() => {
    if (userId == null || userId === undefined) {
      userId = uuidv4()
      localStorage.setItem('userId', userId)
    } else {
      checkTermsAccepted()
    }
  }, [])

  return (
    <div className="App">
      {tycAccepted
        ? (
        <>
        <h1>Aplicación con Términos y Condiciones</h1>
      <button onClick={openModal}>Mostrar Términos y Condiciones</button>
      {showModal && <TerminosCondicionesModal onClose={closeModal} handleAcceptTerms={handleAcceptTerms} />}
        </>
          )
        : <div>
        <h3>Bienvenido</h3>
        </div>}

    </div>
  )
}

export default App
