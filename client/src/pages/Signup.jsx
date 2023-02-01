import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";

export default function Signup() {
  const initialData = { name: "", email: "", password: "" };
  const [userData, setUserData] = useState(initialData);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    return;
  };

  const validateData = () => {
    const { name, email, password } = userData;
    if (!name || !email || !password) return false;
    return true;
  };

  const showAlert = (type, msg) => {
    toast({ title: msg, type, isClosable: true });
  };

  const handleSignup = () => {
    const valid = validateData();
    if (!valid) {
      showAlert("warning", "All fields are mandatory");
      return;
    }
  };
  return (
    <Fragment>
      <Box>
        <Flex>
          <Box>
            <FormControl>
              <Box>Signup</Box>
              <VStack align="start">
                <Box w="full">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </Box>
                <Box w="full">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </Box>
                <Box w="full">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                </Box>
                <Box w="full">
                  <Button> Signup</Button>
                </Box>
              </VStack>
            </FormControl>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
}
