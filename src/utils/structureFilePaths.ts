interface FileNode {
  type: 'file' | 'directory' // node type
  name: string // name of the file or directory
  children?: FileNode[] // optional array of child nodes(only for directories)
}

// Function to structure file paths into a hierarchical tree
export const structureFilePaths = (filepaths: string[]): FileNode[] => {
  // starting point of the tree
  const root: FileNode = { type: 'directory', name: '', children: [] }

  // looping through filepaths []
  filepaths.forEach((path) => {
    // spliting each file path into separate parts by /
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
