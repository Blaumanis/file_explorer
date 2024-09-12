import React, { FC } from 'react'
import { FileIcon, FolderCloseIcon } from '@/icons/icons'

interface InputFieldProps {
  isCreatingFolder: boolean
  newFolderName: string
  newFileName: string
  handleOnKeyPress: () => void
  handleInputChange: (e: any) => void
}

const InputField: FC<InputFieldProps> = ({
  isCreatingFolder,
  newFolderName,
  newFileName,
  handleInputChange,
  handleOnKeyPress,
}) => {
  return (
    <li className='flex items-center gap-[5px]'>
      {isCreatingFolder ? <FolderCloseIcon /> : <FileIcon />}
      <input
        type='text'
        value={isCreatingFolder ? newFolderName : newFileName}
        onChange={(e) => handleInputChange(e)}
        placeholder={isCreatingFolder ? 'Enter folder name' : 'Enter file name'}
        onKeyPress={(e) => e.key === 'Enter' && handleOnKeyPress()}
        className='text-black placeholder:text-black px-[5px] outline-none rounded-sm'
        autoFocus
      />
    </li>
  )
}

export default InputField
