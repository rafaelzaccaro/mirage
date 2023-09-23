import { Input, Box } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'

export function ImagePicker() {
  const inputFile = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState('string')

  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  function handleClick() {
    if (inputFile.current) inputFile.current.click()
  }

  return (
    <>
      <Input
        display={'none'}
        type={'file'}
        accept="image/*"
        ref={inputFile}
        onChange={onSelectFile}
      />
      <Box
        as="image"
        bgImage={preview ? preview : 'https://fakeimg.pl/200x200?text=%20'}
        bgSize={'cover'}
        borderRadius="md"
        h={'200px'}
        w={'200px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        onClick={handleClick}
      >
        <EditIcon fontSize={'30px'} />
      </Box>
    </>
  )
}
