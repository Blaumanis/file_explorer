'use client'
import { Dispatch, FC, SetStateAction, useState } from 'react'

// Define icons for specific files and directories
const icons: Record<string, string> = {
  directoryClosed: '📁',
  directoryOpen: '📂',
  file: '📄',
  '.editorconfig': '⚙️',
  '.gitignore': '🔒',
  '.idea/vcs.xml': '📝',
  '.prettierrc': '🛠️',
  'README.md': '📘',
  'bin/run': '⚙️',
  'bin/run.cmd': '⚙️',
  'package.json': '📦',
  src: '📂',
  'tsconfig.json': '🗃️',
  'tsconfig.tsbuildinfo': '🗃️',
  'yarn-error.log': '⚠️',
  'yarn.lock': '🔒',
  '.js': '🟨',
  '.ts': '🔷',
  rightArrow: '▶',
  downArrow: '▼',
}

// Types for FileNode
interface FileNode {
  type: 'file' | 'directory'
  name: string
  children?: FileNode[]
}

interface FileExplorerProps {
  fileTree: FileNode[]
  isCreatingFolder: boolean
  newFolderName: string
  setNewFolderName: (name: string) => void
  handleAddFolder: () => void
  targetDirPath: string
  setTargetDirPath: Dispatch<SetStateAction<string>>
}

const FileExplorer: FC<FileExplorerProps> = ({
  fileTree,
  isCreatingFolder,
  newFolderName,
  setNewFolderName,
  handleAddFolder,
  setTargetDirPath,
  targetDirPath,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleExpand = (path: string) => {
    const isCurrentlyExpanded = expanded[path]
    if (!isCurrentlyExpanded) {
      setTargetDirPath(path)
    } else {
      const parentPath = path.substring(0, path.lastIndexOf('/')) || 'root'
      if (targetDirPath.startsWith(path)) {
        setTargetDirPath(parentPath)
      }
    }
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }))
  }

  const renderNode = (node: FileNode, path: string) => {
    const extension = node.name.split('.').pop()
    const isOpen = expanded[path] || false
    const icon =
      node.type === 'directory'
        ? isOpen
          ? icons['directoryOpen']
          : icons['directoryClosed']
        : icons[`.${extension}`] || icons[node.name] || icons['file']

    const arrowIcon =
      node.type === 'directory'
        ? isOpen
          ? icons['downArrow']
          : icons['rightArrow']
        : ''

    return (
      <li key={path}>
        <span
          onClick={() => toggleExpand(path)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          {arrowIcon} {icon} {node.name}
        </span>

        {isOpen && (
          <ul style={{ paddingLeft: '20px' }}>
            {node.children?.map((child) =>
              renderNode(child, `${path}/${child.name}`)
            )}
            {isCreatingFolder && targetDirPath === path && (
              <li>
                <input
                  type='text'
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder='Enter folder name'
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
                  className='text-black placeholder:text-black focus:outline-none px-[5px]'
                  autoFocus
                />
              </li>
            )}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div>
      <ul>
        {fileTree.map((node) => renderNode(node, node.name))}
        {isCreatingFolder && targetDirPath === 'root' && (
          <li>
            <input
              type='text'
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder='Enter folder name'
              onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
              autoFocus
              className='text-black placeholder:text-black'
            />
          </li>
        )}
      </ul>
    </div>
  )
}

export default FileExplorer
