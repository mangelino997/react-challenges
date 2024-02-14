import React from 'react'

interface Props {
  onClose: () => void
  handleAcceptTerms: () => Promise<void>
}

const TerminosCondicionesModal: React.FC<Props> = ({ onClose, handleAcceptTerms }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Términos y Condiciones</h1>
        <p>Aquí van los términos y condiciones...</p>
        <button onClick={handleAcceptTerms}>Aceptar Términos y Condiciones</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export default TerminosCondicionesModal
