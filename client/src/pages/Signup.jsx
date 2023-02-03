import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";

import { Fragment, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdInput } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { AiFillLock } from "react-icons/ai";
import { Link } from "react-router-dom";

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
		if (name && email && password) return true;
		return false;
	};

	const showAlert = (status, msg) => {
		toast({ title: msg, status, isClosable: true, position: "top" });
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
			<Box bgGradient="linear(to-tr,pink.200,purple.300,cyan.300)">
				<Flex justify="center" align="center" h="calc(100vh - 77px)" px="4">
					<Box
						w={{ base: "full", md: "container.sm" }}
						boxShadow="dark-lg"
						borderRadius="lg"
						p="4"
						py="8"
						bg="white"
					>
						<Center>
							<FaUserCircle size="5rem" />
						</Center>
						<Center py="6">
							<Text fontSize={{ base: "xl", md: "2xl" }} textAlign="center">
								Welcome to Moneyfi. Signup to continue..
							</Text>
						</Center>
						<FormControl>
							<VStack align="start" gap="4">
								<Box w="full">
									<InputGroup>
										<InputLeftElement
											border="none"
											bg="transparent"
											children={<MdInput color="blue" size="1.2rem" />}
										/>
										<Input
											variant="flushed"
											type="text"
											name="name"
											placeholder="Name"
											value={userData.name}
											onChange={handleChange}
											borderBottom="2px"
											borderColor="blue.400"
											color="blue.700"
										/>
									</InputGroup>
								</Box>
								<Box w="full">
									<InputGroup>
										<InputLeftElement
											border="none"
											bg="transparent"
											children={<CiMail color="blue" size="1.2rem" />}
										/>
										<Input
											variant="flushed"
											type="text"
											name="email"
											placeholder="Email"
											value={userData.email}
											onChange={handleChange}
											borderBottom="2px"
											borderColor="blue.400"
											color="blue.700"
										/>
									</InputGroup>
								</Box>
								<Box w="full">
									<InputGroup>
										<InputLeftElement
											border="none"
											bg="transparent"
											children={<AiFillLock color="blue" size="1.2rem" />}
										/>
										<Input
											variant="flushed"
											type="password"
											name="password"
											placeholder="Password"
											value={userData.password}
											onChange={handleChange}
											borderBottom="2px"
											borderColor="blue.400"
											color="blue.700"
										/>
									</InputGroup>
								</Box>
								<Box w="full">
									<Button
										w="full"
										variant="solid"
										colorScheme="telegram"
										borderRadius="none"
										onClick={handleSignup}
										boxShadow="xl"
									>
										SIGNUP
									</Button>
								</Box>
							</VStack>
						</FormControl>
						<Flex
							py="4"
							justify="center"
							fontSize={{ base: "md", md: "lg" }}
							gap="2"
						>
							<Text>Already have an account.?</Text>
							<Link to="/login">
								<Text fontWeight="semibold" color="purple.500">
									Login
								</Text>
							</Link>
						</Flex>
					</Box>
				</Flex>
			</Box>
		</Fragment>
	);
}
