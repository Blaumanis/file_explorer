import React, { FC } from 'react'

interface CreateButtonProps {
  func: () => void
  title: string
  id: string
}

const CreateButton: FC<CreateButtonProps> = ({ func, title, id }) => {
  return (
    <button id={id} title={title} onClick={() => func()}>
      {id === 'folder' ? '📁' : '📄'}
    </button>
  )
}

export default CreateButton
