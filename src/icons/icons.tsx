import React from 'react'

export const NewFileIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#C5C5C5',
  ...props
}) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M4 7H3V4H0V3H3V0H4V3H7V4H4V7ZM10.5 1.09998L13.9 4.59998L14 5V13.5L13.5 14H3.5L3 13.5V8H4V13H13V6H9V2H5V1H10.2L10.5 1.09998ZM10 2V5H12.9L10 2Z'
      fill={fill}
    />
  </svg>
)

export const NewFolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#C5C5C5',
  ...props
}) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M7 3H4V0H3V3H0V4H3V7H4V4H7V3ZM5.5 7H5V6H5.3L6.1 5.1L6.5 5H14V4H8V3H14.5L15 3.5V13.5L14.5 14H1.5L1 13.5V6.5V6V5H2V6V6.5V13H14V7V6H6.7L5.9 6.9L5.5 7Z'
      fill={fill}
    />
  </svg>
)

export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#C5C5C5',
  ...props
}) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M10.0719 8.02397L5.7146 3.66666L6.33332 3.04794L11 7.71461V8.33333L6.33332 13L5.7146 12.3813L10.0719 8.02397Z'
      fill={fill}
    />
  </svg>
)

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#C5C5C5',
  ...props
}) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M7.97612 10.0719L12.3334 5.7146L12.9521 6.33332L8.28548 11L7.66676 11L3.0001 6.33332L3.61882 5.7146L7.97612 10.0719Z'
      fill={fill}
    />
  </svg>
)

export const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#C5C5C5',
  ...props
}) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M13.71 4.29L10.71 1.29L10 1H4L3 2V14L4 15H13L14 14V5L13.71 4.29ZM13 14H4V2H9V6H13V14ZM10 5V2L13 5H10Z'
      fill={fill}
    />
  </svg>
)

export const FolderCloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#C5C5C5',
  ...props
}) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M14.5 3H7.70996L6.85999 2.15002L6.51001 2H1.51001L1.01001 2.5V6.5V13.5L1.51001 14H14.51L15.01 13.5V9V3.5L14.5 3ZM13.99 11.49V13H1.98999V11.49V7.48999V7H6.47998L6.82996 6.84998L7.68994 5.98999H14V7.48999L13.99 11.49ZM13.99 5H7.48999L7.14001 5.15002L6.28003 6.01001H2V3.01001H6.29004L7.14001 3.85999L7.5 4.01001H14L13.99 5Z'
      fill={fill}
    />
  </svg>
)

export const FolderOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#C5C5C5',
  ...props
}) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.5 14H12.5L12.98 13.63L15.61 6.63L15.13 6H14V3.5L13.5 3H7.70996L6.84998 2.15002L6.5 2H1.5L1 2.5V13.5L1.5 14ZM2 3H6.29004L7.15002 3.84998L7.5 4H13V6H8.5L8.15002 6.15002L7.29004 7H3.5L3.03003 7.33997L2.03003 10.42L2 3ZM12.13 13H2.18994L3.85999 8H7.5L7.84998 7.84998L8.70996 7H14.5L12.13 13Z'
      fill={fill}
    />
  </svg>
)

export default {
  NewFileIcon,
  NewFolderIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  FileIcon,
  FolderCloseIcon,
  FolderOpenIcon,
}
