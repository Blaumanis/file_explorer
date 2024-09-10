'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import FileExplorer from '@/components/FileExplorer'
import { structureFilePaths } from '@/utils/structureFilePaths'

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
  const [targetDirPath, setTargetDirPath] = useState<string>('root')

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://ab-file-explorer.athleticnext.workers.dev/?file=regular'
        )
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
    folderName: string // Name of the new folder to be added
  ): FileNode[] => {
    return nodes.map((node) => {
      // Construct the current path of the node
      const currentPath = `${
        // targetPath === 'root' ? node.name : `${targetPath}/${node.name}`
        targetPath === 'root' ? node.name : `${targetPath}`
      }`

      // Check if the current node's path matches the target path where we want to add the new folder
      if (node.type === 'directory' && currentPath === targetPath) {
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

      // If the current node has children, continue the recursion deeper
      if (node.children) {
        return {
          ...node,
          children: addFolder(targetPath, node.children, folderName),
        }
      }

      // Return the node unchanged if it's not a directory or if it's not the target directory
      return node
    })
  }

  // const addFolder = (
  //   path: string,
  //   nodes: FileNode[],
  //   folderName: string
  // ): FileNode[] => {
  //   return nodes.map((node) => {
  //     // if (node.type === 'directory' && `${path}/${node.name}` == path) {
  //     if (node.type === 'directory' && `${path}` == path) {
  //       return {
  //         ...node,
  //         children: node.children
  //           ? [
  //               ...node.children,
  //               { type: 'directory', name: folderName, children: [] },
  //             ]
  //           : [],
  //       }
  //     }

  //     if (node.children) {
  //       return { ...node, children: addFolder(path, node.children, folderName) }
  //     }

  //     return node
  //   })
  // }

  // Toggle creating folder state
  const handleCreateFolder = () => {
    setIsCreatingFolder(!isCreatingFolder)
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
    // resetCreationState()
  }

  // Reset state after folder creation
  const resetCreationState = () => {
    setIsCreatingFolder(false)
    setNewFolderName('')
  }

  console.log(targetDirPath)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>File Explorer</h1>
      <button onClick={() => handleCreateFolder()}>➕ Create Folder</button>
      <FileExplorer
        fileTree={fileTree}
        isCreatingFolder={isCreatingFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        handleAddFolder={handleAddFolder}
        targetDirPath={targetDirPath}
        setTargetDirPath={setTargetDirPath}
      />
    </div>
  )
}

export default HomePage
