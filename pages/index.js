import Head from "next/head";
import { useState } from "react";
import {
  Center,
  Heading,
  VStack,
  useDisclosure,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import { Notion } from "@neurosity/notion";
import LoginModal from "../components/LoginModal";
import LoggedOut from "../components/LoggedOut";
import LoggedIn from "../components/LoggedIn";

export default function Home() {
  const notion = new Notion();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [progress, setProgress] = useState(null);

  // whenever your focus score is over 50 -- rick roll the homie :)
  if (progress > 50) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  }

  const login = async () => {
    console.log("Email Result", email);
    console.log("Password Result", password);
    if (!email || !password) {
      toast({
        title: `NAH. email or password is empty`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    notion.login({ email, password }).catch((error) => {
      if (error.message) {
        throw toast({
          title: `ERROR! ${error.message}`,
          status: "error",
          isClosable: true,
        });
      }
      if (error == "Already logged in.") {
        throw alreadyLoggedIn();
      }
    });

    notion.focus().subscribe((focus) => {
      const percentage = Math.round(focus.probability * 100);

      // if all is good, go ahead and close modal
      if (percentage) onClose();

      // if completely unfocused, set as 1 (otherwise is null, and shows login)
      if (percentage < 1) {
        setProgress(1);
        return;
      }

      setProgress(Math.round(percentage));
    });
  };

  // deals with weird already login sdk error
  const alreadyLoggedIn = async () => {
    await notion.logout();
    login();
  };

  return (
    <>
      <Center textColor="white" h="100vh" bg="blue.600">
        <Head>
          <title>ImpossiFocus</title>
          <meta
            property="og:image"
            content="https://impossifocus.vercel.app/og-image.png"
          />
          <meta property="og:title" content="ImpossiFocus" />
          <meta
            property="og:description"
            content="ImpossiFocus will measure focus by reading your brainwaves -- and if you're in the zone, it'll ensure that changes with a snazzy rick-roll :-)"
          />
        </Head>
        <VStack pb={20}>
          <Heading fontSize="5xl">ImpossiFocus</Heading>
          {progress ? (
            <LoggedIn progress={progress} />
          ) : (
            <LoggedOut onOpen={onOpen} />
          )}
        </VStack>
        <LoginModal
          onClose={onClose}
          isOpen={isOpen}
          setEmail={setEmail}
          setPassword={setPassword}
          login={login}
        />
      </Center>
      <Text mt="-16" textColor="white" px={2} textAlign="center">
        Made with very little focus by{" "}
        <Link href="https://twitter.com/aleemrehmtulla">@aleemrehmtulla</Link>
      </Text>
    </>
  );
}
