import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";

const LoginModal = ({ onClose, isOpen, setEmail, setPassword, login }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent mx={8}>
        <ModalHeader>
          Sign In Using Your Neurosity Account
          <Text fontWeight="normal" fontSize="xs">
            note: we store nothing. this is just to connect your device
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            mt={4}
            placeholder="Password"
            type="password"
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={2} onClick={onClose}>
            Close
          </Button>
          <Button
            bg="blue.600"
            textColor="white"
            _hover={{ bg: "blue.500" }}
            mr={3}
            onClick={login}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default LoginModal;
