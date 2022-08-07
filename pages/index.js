import Head from "next/head";
import {
  Center,
  Heading,
  VStack,
  useDisclosure,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { convert } from "html-to-text";
export default function Home() {
  const [text, setText] = useState("");
  const getText = async () => {
    const get = await fetch("http://localhost:3000/api/hi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://apnews.com/article/taiwan-china-asia-beijing-b252479810add6a225fa1e4a6d441983?utm_campaign=mb&utm_medium=newsletter&utm_source=morning_brew",
      }),
    });
    // console.log(get);
    const yo = await get.text();

    setText(yo);
  };
  useEffect(() => {
    getText();
  }, []);

  return (
    <>
      <Center py={20} px={48}>
        {text}
      </Center>
    </>
  );
}
