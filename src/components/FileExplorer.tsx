'use client'
import { FC, useState } from 'react'
import InputField from './InputField'

import icons from '@/icons/iconsList'

// interfaces
import { FileNode, FileExplorerProps } from '@/utils/types'

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

    // Prioritize specific directory icons before using the default folder icons
    const icon = isDirectory
      ? icons[node.name] ||
        (isOpen ? icons['directoryOpen'] : icons['directoryClosed'])
      : icons[`.${extension}`] || icons[node.name] || icons['file']

    console.log(icon)

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
      <li className='text-[#fff] py-[4px] select-none' key={path}>
        <span
          onClick={() => toggleExpand(path, isDirectory)}
          onContextMenu={(e) => handleRightClick(e, path)}
          className='fileItem cursor-pointer flex items-center gap-[4px]'
        >
          {arrowIcon} {icon} {node.name}
        </span>

        {isOpen && (
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
