import {
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

const LoggedIn = ({ progress }) => {
  return (
    <>
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
    </>
  );
};
export default LoggedIn;
