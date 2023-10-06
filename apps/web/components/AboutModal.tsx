import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

export function AboutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Text
        onClick={onOpen}
        _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
      >
        About
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'}>
            About Mirage
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={'2'}>
              Mirage is a minimalist ephemeral content forum:
            </Text>
            <Text
              lineHeight={'tall'}
              fontStyle={'italic'}
              bg={'blackAlpha.500'}
              p={'2'}
              rounded={'lg'}
            >
              &quot;A dynamic platform where content is fleeting. Here, posts
              (called Glimpses) are fresh, timely, and ever-evolving, as they
              automatically vanish after a set duration. Dive into the now,
              knowing that every visit offers a new experience.&quot;
            </Text>
            <Text fontSize={'md'} my={'2'} lineHeight={'tall'}>
              I developed Mirage in about two weeks, give or take. It&apos;s a
              simple project, more akin to a proof of concept than an actual,
              fully fleshed out website, that I decided to create simply out of
              boredom and also because I wanted to learn React, which I think I
              did quite well for my first time. I also experimented with NextJS
              on the front-end and NestJS on the backend, these two were
              completely unknown to me and I had a blast learning their quirks,
              how they work and what we can do with them (although they
              sometimes cause a headache or two). Of course, there is still much
              to do, but I am happy with its current state for now, and will
              move on to new projects. I might, though, revisit this in the
              future, since I do believe it is an interesting idea.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
