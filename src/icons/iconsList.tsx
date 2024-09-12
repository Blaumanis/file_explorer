import React from 'react'

import { BiLogoTypescript } from 'react-icons/bi'
import { FaJsSquare } from 'react-icons/fa'
import { GoFileBinary } from 'react-icons/go'

import {
  ChevronRightIcon,
  ChevronDownIcon,
  FileIcon,
  FolderOpenIcon,
  FolderCloseIcon,
  SrcFolderIcon,
  TsConfigIcon,
  GitIgnoreIcon,
  JSONFileIcon,
  ReadMeIcon,
  YarnIcon,
  CmdIcon,
  XmlIcon,
  ConfigIcon,
  PrettierIcon,
  HtmlIcon,
  CssIcon,
} from '@/icons/icons'

// Define icons for specific files and directories
const icons: Record<string, React.ReactNode> = {
  directoryClosed: <FolderCloseIcon fill='#fff' />,
  directoryOpen: <FolderOpenIcon fill='#fff' />,
  file: <FileIcon fill='#fff' />,
  '.editorconfig': <ConfigIcon />,
  '.gitignore': <GitIgnoreIcon />,
  '.prettierrc': <PrettierIcon />,
  'README.md': <ReadMeIcon />,
  'package.json': <JSONFileIcon />,
  src: <SrcFolderIcon />,
  bin: <GoFileBinary />,
  'tsconfig.json': <TsConfigIcon />,
  'tsconfig.tsbuildinfo': <TsConfigIcon />,
  'yarn-error.log': <YarnIcon />,
  'yarn.lock': <YarnIcon />,
  '.js': <FaJsSquare />,
  '.ts': <BiLogoTypescript />,
  '.cmd': <CmdIcon />,
  '.xml': <XmlIcon />,
  '.html': <HtmlIcon />,
  '.css': <CssIcon />,
  rightArrow: <ChevronRightIcon fill='#fff' />,
  downArrow: <ChevronDownIcon fill='#fff' />,
}

export default icons
