'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import {
  IconButton,
  Stack,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Input,
  Button,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon, LockIcon } from '@chakra-ui/icons'
import { Glimpse } from '@web/lib/GlimpseType'
import { hasCookie, setCookie } from 'cookies-next'
import { verifySecret } from '@web/lib/hashSecret'

interface props {
  glimpse: Glimpse
}

export const RichTextEditor: React.FC<props> = ({ glimpse }: props) => {
  const [textValue, setTextValue] = useState(glimpse.content)
  const [secretGuess, setSecretGuess] = useState('')
  const [showError, setShowError] = useState(false)
  const [access, setAccess] = useState(hasCookie(glimpse.id) || !glimpse.secret)
  const inputFocusBorderColor = useColorModeValue('white.500', 'white.200')
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const toast = useToast()

  return (
    <>
      <Stack>
        {access ? (
          <IconButton
            onClick={async () => {
              const formData = new FormData()
              formData.append('id', glimpse.id)
              formData.append('content', textValue)

              const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/edit`,
                {
                  method: 'put',
                  body: formData,
                  cache: 'no-store',
                },
              )

              if (res.status == 200) {
                toast({
                  title: 'Success!',
                  status: 'success',
                  description: 'Glimpse successfully updated.',
                  duration: 9000,
                  isClosable: true,
                })
              } else {
                toast({
                  title: 'Oops!',
                  status: 'error',
                  description: 'Something went wrong.',
                  duration: 9000,
                  isClosable: true,
                })
              }
            }}
            isRound
            colorScheme="white"
            aria-label="new"
            fontSize={'20px'}
            icon={<CheckIcon />}
            pos={'fixed'}
            bottom={'20px'}
            right={'30px'}
          />
        ) : (
          <Popover>
            <PopoverTrigger>
              <IconButton
                isRound
                colorScheme="white"
                aria-label="secret"
                fontSize={'20px'}
                icon={<LockIcon />}
                pos={'fixed'}
                bottom={'20px'}
                right={'30px'}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Secret 🤫</PopoverHeader>
                <PopoverCloseButton ref={closeRef} />
                <PopoverBody>
                  <Stack direction={'row'}>
                    <Input
                      value={secretGuess}
                      onChange={(e) => setSecretGuess(e.target.value)}
                      isInvalid={showError}
                      errorBorderColor="crimson"
                      focusBorderColor={inputFocusBorderColor}
                    ></Input>
                    <Button
                      colorScheme="gray"
                      onClick={() => {
                        let correct = verifySecret(secretGuess, glimpse.secret!)
                        setShowError(!correct)
                        if (correct) {
                          setAccess(correct)
                          setCookie(glimpse.id, correct)
                          if (closeRef.current) closeRef.current.click()
                        }
                      }}
                    >
                      Unlock
                    </Button>
                  </Stack>
                  <Text color={'tomato'}>{showError ? 'Incorrect!' : ''}</Text>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
      </Stack>
      <ReactQuill
        defaultValue={glimpse.content}
        value={textValue}
        onChange={setTextValue}
        modules={{ toolbar: access }}
        readOnly={!access}
      ></ReactQuill>
    </>
  )
}
