'use client'

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  Text,
  Checkbox,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import React, { ChangeEvent } from 'react'
import { ImagePicker } from './ImagePicker'

export function NewGlimpseModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [slugValue, setSlugValue] = React.useState('')
  const [secretValue, setSecretValue] = React.useState('')
  const [publicValue, setPublicValue] = React.useState(true)
  const [fileValue, setFileValue] = React.useState<FileList>()
  const [error, setError] = React.useState<string>()
  const handleSlugChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSlugValue(event.target.value.replace(/ /g, '-'))
  const handleSecretChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSecretValue(event.target.value)
  const handlePublicChange = (event: ChangeEvent<any>) =>
    setPublicValue(event.target.isChecked)
  async function test() {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    const formData = new FormData()
    formData.append('slug', slugValue)
    formData.append('content', '<p>This is a brand new <em>Glimpse</em>✨</p>')
    formData.append('lifetime', d.toISOString())
    formData.append('secret', secretValue)
    formData.append('isPublic', publicValue.toString())
    if (fileValue && fileValue.length > 0)
      formData.append('thumb', fileValue[0])
    const a = await fetch('http://localhost:7777/new', {
      method: 'post',
      body: formData,
    })
    if (a.status == 400) setError((await a.json()).message)
    else {
      onClose()
      window.location.reload()
    }
  }
  return (
    <>
      <IconButton
        onClick={onOpen}
        isRound
        color={'white'}
        bg="green"
        _dark={{ bg: 'green' }}
        aria-label="new"
        fontSize={'20px'}
        icon={<AddIcon />}
        pos={'fixed'}
        bottom={'20px'}
        right={'30px'}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent bg={'gray.900'}>
          <ModalHeader display={'flex'} justifyContent={'center'}>
            Create new Glimpse✨
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={'row'} spacing={'10'}>
              <Stack direction={'column'}>
                <Text>Slug:</Text>
                <InputGroup>
                  <InputLeftAddon>mirage.com/</InputLeftAddon>
                  <Input
                    placeholder="some-cool-name"
                    value={slugValue}
                    onChange={handleSlugChange}
                    isInvalid={!!error ? true : false}
                    errorBorderColor="crimson"
                  ></Input>
                </InputGroup>
                <Text color={'tomato'}>{error}</Text>
                <Text mt={'5'}>Secret:</Text>
                <Input
                  value={secretValue}
                  onChange={handleSecretChange}
                  placeholder="Leave blank to let anyone edit"
                  mb={'5'}
                ></Input>
                <Checkbox
                  defaultChecked
                  isChecked={publicValue}
                  onChange={handlePublicChange}
                >
                  Public?
                </Checkbox>
              </Stack>
              <Stack direction={'column'}>
                <Text>Thumb</Text>
                <ImagePicker
                  handleFileChange={(FileList: FileList) =>
                    setFileValue(FileList)
                  }
                />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={test}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
