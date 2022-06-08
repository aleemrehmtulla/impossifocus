import { Box, Center, Text, Image, Link } from "@chakra-ui/react";

const LoggedOut = ({ onOpen }) => {
  return (
    <>
      <Box align="center">
        <Text w="60%" textAlign="center" fontSize="sm" fontWeight="normal">
          by connecting your Neurosity (BCI), we can measure your brainwaves to
          detect focus. if focused {" -> "} distract
        </Text>
      </Box>

      <Box pt={1}>
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
    </>
  );
};
export default LoggedOut;
