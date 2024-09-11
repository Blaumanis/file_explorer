import React, { FC } from 'react'

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
    <li>
      {isCreatingFolder ? '📁' : '📄'}
      <input
        type='text'
        value={isCreatingFolder ? newFolderName : newFileName}
        onChange={(e) => handleInputChange(e)}
        placeholder={isCreatingFolder ? 'Enter folder name' : 'Enter file name'}
        onKeyPress={(e) => e.key === 'Enter' && handleOnKeyPress()}
        className='text-black placeholder:text-black px-[5px] py-[1px]'
        autoFocus
      />
    </li>
  )
}

export default InputField
