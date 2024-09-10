interface FileNode {
  type: 'file' | 'directory'
  name: string
  children?: FileNode[]
}

// Function to structure file paths into a hierarchical tree
export const structureFilePaths = (filepaths: string[]): FileNode[] => {
  const root: FileNode = { type: 'directory', name: '', children: [] }

  filepaths.forEach((path) => {
    const parts = path.split('/')
    let current = root

    // Traverse through each part of the path
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // Last part: file
        current.children!.push({ type: 'file', name: part })
      } else {
        // Directory part
        let dir = current.children!.find(
          (child) => child.type === 'directory' && child.name === part
        )

        if (!dir) {
          // If the directory doesn't exist, create it
          dir = { type: 'directory', name: part, children: [] }
          current.children!.push(dir)
        }

        // Move deeper into the directory
        current = dir
      }
    })
  })

  return root.children || []
}
