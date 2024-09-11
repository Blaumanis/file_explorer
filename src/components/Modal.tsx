import React, { FC } from 'react'

interface ModalProps {
  loading: boolean
  error: string | null
}

const Modal: FC<ModalProps> = ({ loading, error }) => {
  return (
    <div className='fixed inset-0  flex items-center justify-center'>
      {loading ? <div className='loader' /> : <p>Error: {error}</p>}
    </div>
  )
}

export default Modal
