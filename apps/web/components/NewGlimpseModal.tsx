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
  const [value, setValue] = React.useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value.replace(/ /g, '-'))
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
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'}>
            Create new Glimpse✨
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={'row'} spacing={'10'}>
              <Stack direction={'column'}>
                <Text>Slug:</Text>
                <InputGroup mb={'5'}>
                  <InputLeftAddon>mirage.com/</InputLeftAddon>
                  <Input
                    placeholder="some-cool-name"
                    value={value}
                    onChange={handleChange}
                  ></Input>
                </InputGroup>
                <Text>Secret:</Text>
                <Input
                  placeholder="Leave blank to let anyone edit"
                  mb={'5'}
                ></Input>
                <Checkbox defaultChecked>Public?</Checkbox>
              </Stack>
              <Stack direction={'column'}>
                <Text>Thumb</Text>
                <ImagePicker />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
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
