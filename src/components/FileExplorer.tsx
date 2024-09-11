'use client'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import InputField from './InputField'

import { BiLogoTypescript } from 'react-icons/bi'
import { SiGitignoredotio } from 'react-icons/si'
import { TbSourceCode } from 'react-icons/tb'
import { FaReadme } from 'react-icons/fa'

import {
  ChevronRightIcon,
  ChevronDownIcon,
  FileIcon,
  FolderOpenIcon,
  FolderCloseIcon,
} from '@/icons/icons'

// Define icons for specific files and directories
const icons: Record<string, React.ReactNode> = {
  directoryClosed: <FolderCloseIcon fill='#fff' />,
  directoryOpen: <FolderOpenIcon fill='#fff' />,
  file: <FileIcon fill='#fff' />,
  '.editorconfig': '⚙️',
  '.gitignore': <SiGitignoredotio />,
  '.idea/vcs.xml': '📝',
  '.prettierrc': '🛠️',
  'README.md': <FaReadme />,
  'bin/run': '⚙️',
  'bin/run.cmd': '⚙️',
  'package.json': '📦',
  src: <TbSourceCode />,
  'tsconfig.json': '🗃️',
  'tsconfig.tsbuildinfo': '🗃️',
  'yarn-error.log': '⚠️',
  'yarn.lock': '🔒',
  '.js': '🟨',
  '.ts': <BiLogoTypescript />,
  rightArrow: <ChevronRightIcon fill='#fff' />,
  downArrow: <ChevronDownIcon fill='#fff' />,
}

// Types for FileNode
interface FileNode {
  type: 'file' | 'directory'
  name: string
  children?: FileNode[]
}

// types for component arguments/props
interface FileExplorerProps {
  fileTree: FileNode[]
  isCreatingFolder: boolean
  newFolderName: string
  setNewFolderName: (name: string) => void
  handleAddFolder: () => void
  handleAddFile: () => void
  newFileName: string
  setNewFileName: (name: string) => void
  isCreatingFile: boolean
  targetDirPath: string
  setTargetDirPath: Dispatch<SetStateAction<string>>
  clearCreationState: () => void
  handleDelete: (path: string) => void
}

const FileExplorer: FC<FileExplorerProps> = ({
  fileTree,
  isCreatingFolder,
  newFolderName,
  setNewFolderName,
  handleAddFolder,
  isCreatingFile,
  newFileName,
  setNewFileName,
  setTargetDirPath,
  targetDirPath,
  handleAddFile,
  clearCreationState,
  handleDelete,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  //   function for expanding the folders
  const toggleExpand = (path: string, isDirectory: boolean) => {
    // clear states for folder or file creating when expanding folders
    clearCreationState()

    const isCurrentlyExpanded = expanded[path]

    // Only set targetDirPath if it's a directory
    if (isDirectory && !isCurrentlyExpanded) {
      setTargetDirPath(path)
    } else if (isDirectory) {
      const parentPath = path.substring(0, path.lastIndexOf('/')) || 'root'
      if (targetDirPath.startsWith(path)) {
        setTargetDirPath(parentPath)
      }
    }

    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }))
  }

  //   function for rendering fileTree in right structure and with right icons
  const renderNode = (node: FileNode, path: string) => {
    const extension = node.name.split('.').pop()
    const isOpen = expanded[path] || false
    const isDirectory = node.type === 'directory'

    const icon = isDirectory
      ? isOpen
        ? icons['directoryOpen']
        : icons['directoryClosed']
      : icons[`.${extension}`] || icons[node.name] || icons['file']

    const arrowIcon = isDirectory
      ? isOpen
        ? icons['downArrow']
        : icons['rightArrow']
      : ''

    // Handle right-click to delete
    const handleRightClick = (event: React.MouseEvent, path: string) => {
      event.preventDefault() // Prevent default context menu
      if (window.confirm(`Are you sure you want to delete ${path}?`)) {
        handleDelete(path)
      }
    }

    return (
      <li className='text-[#fff] py-[4px]' key={path}>
        <span
          onClick={() => toggleExpand(path, isDirectory)}
          onContextMenu={(e) => handleRightClick(e, path)}
          className='fileItem cursor-pointer flex items-center gap-[4px]'
        >
          {arrowIcon} {icon} {node.name}
        </span>

        {isOpen && (
          //   <ul className='pl-[25px] flex gap-[10px] flex-col'>
          <ul className='pl-[20px]'>
            {node.children?.map((child) =>
              renderNode(child, `${path}/${child.name}`)
            )}
            {(isCreatingFolder || isCreatingFile) && targetDirPath === path && (
              <InputField
                isCreatingFolder={isCreatingFolder}
                newFolderName={newFolderName}
                newFileName={newFileName}
                handleInputChange={handleInputChange}
                handleOnKeyPress={handleOnKeyPress}
              />
            )}
          </ul>
        )}
      </li>
    )
  }

  const handleInputChange = (e: any) => {
    isCreatingFolder
      ? setNewFolderName(e.target.value) // Change handler for folder creation
      : setNewFileName(e.target.value) // Change handler for file creation
  }

  const handleOnKeyPress = () => {
    isCreatingFolder ? handleAddFolder() : handleAddFile()
  }

  return (
    <div>
      <ul className='px-[5px] py-[10px] rounded-br-md bg-[#202020]'>
        {/* whole file tree rendered */}
        {fileTree.map((node) => renderNode(node, node.name))}
        {/* separete input field when creating file or folder inside root dir */}
        {(isCreatingFolder || isCreatingFile) && targetDirPath === 'root' && (
          <InputField
            isCreatingFolder={isCreatingFolder}
            newFolderName={newFolderName}
            newFileName={newFileName}
            handleInputChange={handleInputChange}
            handleOnKeyPress={handleOnKeyPress}
          />
        )}
      </ul>
    </div>
  )
}

export default FileExplorer
