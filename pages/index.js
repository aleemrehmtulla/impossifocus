import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  useDisclosure,
  Lorem,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  ModalCloseButton,
  Toast,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { Notion } from "@neurosity/notion";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [progress, setProgress] = useState(null);
  const notion = new Notion();

  if (progress > 50) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  }

  const login = async () => {
    console.log(email, password);
    const user = await notion.login({ email, password }).catch((error) => {
      if (error.message) {
        console.log(error.message);
        return;
      }
      console.log("Log in error", error);
    });

    onClose();
    setUser(user);
    notion.focus().subscribe((focus) => {
      console.log(focus.probability);
      const value = focus.probability * 100;
      console.log(value);
      const final = Math.round(value);
      if (final < 1) {
        setProgress(1);
        return;
      }
      setProgress(Math.round(value));
    });
    console.log(user);
  };
  const logout = async () => {
    await notion.logout();
    setUser(null);
  };

  return (
    <Center textColor="white" h="100vh" bg="blue.600">
      <VStack pb={20}>
        <Heading fontSize="5xl">ImpossiFocus </Heading>
        <Box align="center" display={progress ? "none" : "block"}>
          <Text w="60%" textAlign="center" fontSize="sm" fontWeight="normal">
            by connecting your Neurosity (BCI), we can measure your brainwaves
            to detect focus. if focused {" -> "} distract
          </Text>
        </Box>

        <Text textAlign="center" display={progress ? "flex" : "none"}>
          Your current focus is at: &nbsp;<b>{progress}%</b>.
        </Text>
        <Text display={progress ? "flex" : "none"} pb={2}>
          Hit over 50% and youre done baby 😈
        </Text>

        <CircularProgress
          display={progress ? "flex" : "none"}
          size="48"
          value={progress}
        >
          <CircularProgressLabel fontSize="4xl">
            {progress}%
          </CircularProgressLabel>
        </CircularProgress>

        <Box display={progress ? "none" : "box"} pt={1}>
          <Center
            rounded="full"
            align="center"
            onClick={onOpen}
            p={2}
            px={4}
            bg="black"
            textColor="white"
            cursor="pointer"
            transition="all 0.5s"
            _hover={{ bg: "gray.700" }}
          >
            <Image
              boxSize="2rem"
              alt=""
              src="https://docs.neurosity.co/img/logo.png"
            />
            <Text pl={2}>Sign In With Neurosity</Text>
          </Center>
          <Text pt={2} textAlig="center" fontStyle="italic">
            don&apos;t have a neurosity? grab one{" "}
            <Link
              textDecor="underline"
              textColor="gray.400"
              href="https://neurosity.co"
            >
              here
            </Link>
          </Text>
        </Box>
      </VStack>

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
              autoComplete="password"
              mt={4}
              placeholder="Password"
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
    </Center>
  );
}
