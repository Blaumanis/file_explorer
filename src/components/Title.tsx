import React, { FC } from 'react'
import { ChevronRightIcon, ChevronDownIcon } from '@/icons/icons'

interface TitleProps {
  func: () => void
  isShowingFileTree: boolean
}

const Title: FC<TitleProps> = ({ func, isShowingFileTree }) => {
  return (
    <h1
      onClick={() => func()}
      className='text-[18px] flex items-center cursor-pointer select-none'
    >
      {isShowingFileTree ? (
        <ChevronDownIcon fill='#202020' />
      ) : (
        <ChevronRightIcon fill='#202020' />
      )}
      FILE_EXPLORER
    </h1>
  )
}

export default Title
