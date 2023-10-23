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
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'
import { AddIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import React, { ChangeEvent } from 'react'
import { ImagePicker } from './ImagePicker'
import { useRouter } from 'next/navigation'
import { hashSecret } from '@web/lib/hashSecret'
import { isEmptyStatement } from 'typescript'

export function NewGlimpseModal() {
  const { push } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [slugValue, setSlugValue] = React.useState('')
  const [secretValue, setSecretValue] = React.useState('')
  const [publicValue, setPublicValue] = React.useState(true)
  const [fileValue, setFileValue] = React.useState<FileList>()
  const [error, setError] = React.useState<string>()
  const inputFocusBorderColor = useColorModeValue('white.500', 'white.200')
  const handleSlugChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSlugValue(event.target.value.toLowerCase().replace(/ /g, '-'))
  const handleSecretChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSecretValue(event.target.value)
  const handlePublicChange = (event: ChangeEvent<any>) =>
    setPublicValue(event.target.isChecked)
  async function createGlimpse() {
    if (!slugValue) {
      setError('Cannot be empty!')
    } else if (!/^[a-z0-9\-]+$/.test(slugValue)) {
      setError('Cannot contain special characters, except dashes')
    } else {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      const formData = new FormData()
      formData.append('slug', slugValue)
      formData.append(
        'content',
        '<p>This is a brand new <em>Glimpse</em>✨</p>',
      )
      formData.append('lifetime', d.toISOString())
      formData.append(
        'secret',
        secretValue != '' ? hashSecret(secretValue) : secretValue,
      )
      formData.append(
        'isPublic',
        publicValue ? publicValue.toString() : 'false',
      )
      if (fileValue && fileValue.length > 0)
        formData.append('thumb', fileValue[0])
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/new`, {
        method: 'post',
        body: formData,
      })
      if (res.status == 400) setError((await res.json()).message)
      else {
        onClose()
        push(`/${slugValue}`)
      }
    }
  }
  return (
    <>
      <IconButton
        onClick={onOpen}
        isRound
        colorScheme="white"
        aria-label="new"
        fontSize={'20px'}
        icon={<AddIcon />}
        pos={'fixed'}
        bottom={'20px'}
        right={'30px'}
        zIndex={'2'}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'}>
            Create new Glimpse✨
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={'row'} spacing={'10'}>
              <Stack direction={'column'}>
                <Stack direction={'row'} alignItems={'center'}>
                  <Text>Slug:</Text>
                  <Tooltip
                    hasArrow
                    bg={inputFocusBorderColor}
                    label="The name of your Glimpse, also the URL for it."
                    placement="right"
                  >
                    <QuestionOutlineIcon />
                  </Tooltip>
                </Stack>
                <InputGroup>
                  <InputLeftAddon>mirage.com/</InputLeftAddon>
                  <Input
                    placeholder="some-cool-name"
                    value={slugValue}
                    onChange={handleSlugChange}
                    isInvalid={!!error ? true : false}
                    errorBorderColor="crimson"
                    focusBorderColor={inputFocusBorderColor}
                    mb={'5'}
                  ></Input>
                </InputGroup>
                <Text color={'tomato'}>{error}</Text>
                <Stack direction={'row'} alignItems={'center'}>
                  <Text>Secret:</Text>
                  <Tooltip
                    hasArrow
                    bg={inputFocusBorderColor}
                    label="The secret passphrase people will need to be able to edit your Glimpse. Leave empty if you want to let anyone edit."
                    placement="right"
                  >
                    <QuestionOutlineIcon />
                  </Tooltip>
                </Stack>
                <Input
                  value={secretValue}
                  onChange={handleSecretChange}
                  placeholder="Leave blank to let anyone edit"
                  mb={'5'}
                  focusBorderColor={inputFocusBorderColor}
                ></Input>
                <Stack direction={'row'} alignItems={'center'}>
                  <Checkbox
                    defaultChecked
                    isChecked={publicValue}
                    onChange={handlePublicChange}
                    colorScheme="white"
                  >
                    Public?
                  </Checkbox>
                  <Tooltip
                    hasArrow
                    bg={inputFocusBorderColor}
                    label="Whether your Glimpse will show up on the home page or not. If unchecked, it will only be accessible through URL."
                    placement="right"
                  >
                    <QuestionOutlineIcon />
                  </Tooltip>
                </Stack>
              </Stack>
              <Stack direction={'column'}>
                <Stack direction={'row'} alignItems={'center'}>
                  <Text>Thumb</Text>
                  <Tooltip
                    hasArrow
                    bg={inputFocusBorderColor}
                    label="The image used as thumbnail on the home page for your Glimpse."
                    placement="auto"
                  >
                    <QuestionOutlineIcon />
                  </Tooltip>
                </Stack>
                <ImagePicker
                  handleFileChange={(FileList: FileList) =>
                    setFileValue(FileList)
                  }
                />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter mr={'6'}>
            <Button
              variant="solid"
              colorScheme="gray"
              mr={3}
              onClick={createGlimpse}
            >
              Create
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={onClose}>
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
