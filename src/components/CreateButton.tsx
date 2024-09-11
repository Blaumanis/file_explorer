import React, { FC } from 'react'
import { NewFileIcon, NewFolderIcon } from '@/icons/icons'

interface CreateButtonProps {
  func: () => void
  title: string
  id: string
}

const CreateButton: FC<CreateButtonProps> = ({ func, title, id }) => {
  return (
    <button className='btn' id={id} title={title} onClick={() => func()}>
      {id === 'folder' ? (
        <NewFolderIcon fill='#202020' />
      ) : (
        <NewFileIcon fill='#202020' />
      )}
    </button>
  )
}

export default CreateButton
