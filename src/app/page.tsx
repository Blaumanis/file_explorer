'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import FileExplorer from '@/components/FileExplorer'
import { structureFilePaths } from '@/utils/structureFilePaths'
import CreateButton from '@/components/CreateButton'

// Assuming this is the response structure
interface ApiResponse {
  name: string
  filepaths: string[]
}

// Ensure correct FileNode typing
interface FileNode {
  type: 'file' | 'directory'
  name: string
  children?: FileNode[]
}

const HomePage = () => {
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [isCreatingFile, setIsCreatingFile] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [targetDirPath, setTargetDirPath] = useState<string>('root')

  // fetching data on intial render from API endpoint
  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://ab-file-explorer.athleticnext.workers.dev/?file=regular'
        )
        // passing data trough the utility function to sort in the right structure
        const structuredData = structureFilePaths(response.data.filepaths)
        setFileTree(structuredData)
      } catch (err) {
        setError('Failed to load file paths.')
      } finally {
        setLoading(false)
      }
    }

    fetchFileData()
  }, [])

  // Function to add a new folder to the correct path within the file tree
  const addFolder = (
    targetPath: string, // Path where the new folder should be added (e.g., 'src/commands')
    nodes: FileNode[], // Current list of file nodes at the current level
    folderName: string, // Name of the new folder to be added
    currentPath = '' // Current path traversal, defaults to the root
  ): FileNode[] => {
    return nodes.map((node) => {
      // Construct the full path for the current node
      const fullPath = currentPath ? `${currentPath}/${node.name}` : node.name

      // If current node is a directory and matches the target path
      if (node.type === 'directory' && fullPath === targetPath) {
        // Add the new folder inside the matching directory
        return {
          ...node,
          children: node.children
            ? [
                ...node.children,
                { type: 'directory', name: folderName, children: [] },
              ]
            : [{ type: 'directory', name: folderName, children: [] }],
        }
      }

      // If node has children, recursively continue to add the folder deeper
      if (node.type === 'directory' && node.children) {
        return {
          ...node,
          children: addFolder(targetPath, node.children, folderName, fullPath),
        }
      }

      // Return the node unchanged if it's not the target directory
      return node
    })
  }

  // Add new folder to the selected path
  const handleAddFolder = () => {
    if (targetDirPath !== 'root') {
      // Add folder to the correct target directory
      const updatedTree = addFolder(targetDirPath, fileTree, newFolderName)
      setFileTree(updatedTree)
    } else {
      // Add folder directly under the root
      setFileTree([
        ...fileTree,
        { type: 'directory', name: newFolderName, children: [] },
      ])
    }
    resetFolderCreationState()
  }

  // Reset state after folder creation
  const resetFolderCreationState = () => {
    setIsCreatingFolder(false)
    setNewFolderName('')
  }

  // Function to add a new file to the correct path within the file tree
  const addFile = (
    targetPath: string, // Path where the new file should be added (e.g., 'src/commands')
    nodes: FileNode[], // Current list of file nodes at the current level
    fileName: string, // Name of the new file to be added
    currentPath = '' // Current path traversal, defaults to the root
  ): FileNode[] => {
    return nodes.map((node) => {
      // Construct the full path for the current node
      const fullPath = currentPath ? `${currentPath}/${node.name}` : node.name

      // If current node is a directory and matches the target path
      if (node.type === 'directory' && fullPath === targetPath) {
        // Add the new file inside the matching directory
        return {
          ...node,
          children: node.children
            ? [...node.children, { type: 'file', name: fileName }]
            : [{ type: 'file', name: fileName }],
        }
      }

      // If node has children, recursively continue to add the file deeper
      if (node.type === 'directory' && node.children) {
        return {
          ...node,
          children: addFile(targetPath, node.children, fileName, fullPath),
        }
      }

      // Return the node unchanged if it's not the target directory
      return node
    })
  }

  // Add new file to the selected path
  const handleAddFile = () => {
    if (targetDirPath !== 'root') {
      // Add file to the correct target directory
      const updatedTree = addFile(targetDirPath, fileTree, newFileName)
      setFileTree(updatedTree)
    } else {
      // Add file directly under the root
      setFileTree([
        ...fileTree,
        { type: 'file', name: newFileName, children: [] },
      ])
    }
    resetFileCreationState()
  }

  // Reset state after file creation
  const resetFileCreationState = () => {
    setIsCreatingFile(false)
    setNewFileName('')
  }

  // Toggle creating folder state
  const handleCreateFolder = () => {
    setIsCreatingFolder(!isCreatingFolder)
    setIsCreatingFile(false)
  }

  // Toggle creating file state
  const handleCreateFile = () => {
    setIsCreatingFile(!isCreatingFile)
    setIsCreatingFolder(false)
  }

  const clearCreationState = () => {
    setIsCreatingFile(false)
    setIsCreatingFolder(false)
  }

  const handleDelete = (path: string) => {
    // Helper function to delete a node
    const deleteNode = (
      nodes: FileNode[],
      pathToDelete: string,
      parentPath: string = ''
    ): FileNode[] => {
      return nodes.reduce<FileNode[]>((result, node) => {
        // Determine the full path of the current node
        const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name

        if (node.type === 'directory') {
          if (fullPath === pathToDelete) {
            // Skip the directory to delete
            return result
          }

          // Recursively process children
          const filteredChildren = node.children
            ? deleteNode(node.children, pathToDelete, fullPath)
            : undefined

          // Add directory to result with filtered children
          result.push({ ...node, children: filteredChildren })
        } else {
          // For files, only exclude if it matches the path to delete
          if (fullPath !== pathToDelete) {
            result.push(node)
          }
        }

        return result
      }, [])
    }

    // Update the file tree after deletion
    const updatedTree = deleteNode(fileTree, path)
    setFileTree(updatedTree)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <main className='p-2 w-[300px]'>
      <div className='flex items-center gap-[3px] bg-slate-200 p-[2px] justify-between'>
        <h1 className=''>FILE_EXPLORER</h1>
        <div>
          <CreateButton
            title='New Folder...'
            id='folder'
            func={handleCreateFolder}
          />
          <CreateButton title='New File...' id='file' func={handleCreateFile} />
        </div>
      </div>
      <FileExplorer
        fileTree={fileTree}
        isCreatingFolder={isCreatingFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        handleAddFolder={handleAddFolder}
        targetDirPath={targetDirPath}
        setTargetDirPath={setTargetDirPath}
        newFileName={newFileName}
        setNewFileName={setNewFileName}
        isCreatingFile={isCreatingFile}
        handleAddFile={handleAddFile}
        clearCreationState={clearCreationState}
        handleDelete={handleDelete}
      />
    </main>
  )
}

export default HomePage
