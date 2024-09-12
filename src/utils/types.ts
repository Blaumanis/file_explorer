import { Dispatch, SetStateAction } from 'react'

// FileNode structure
export interface FileNode {
  type: 'file' | 'directory'
  name: string
  children?: FileNode[]
}

// API response structure
export interface ApiResponse {
  name: string
  filepaths: string[]
}

export interface FileExplorerProps {
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
