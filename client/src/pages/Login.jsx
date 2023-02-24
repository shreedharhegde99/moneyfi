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
import { CiMail } from "react-icons/ci";
import { AiFillLock } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth/auth.action";
import { clearMessage } from "../store/info/info.action";

export default function Login() {
	const initialData = { email: "", password: "" };
	const [userData, setUserData] = useState(initialData);
	const { message, error, success, loading } = useSelector(
		(state) => state.info
	);
	const { isAuth } = useSelector((state) => state.auth);
	const toast = useToast();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
		return;
	};

	const validateData = () => {
		const { email, password } = userData;
		if (email && password) return true;
		return false;
	};

	const showAlert = (status, msg) => {
		toast({ title: msg, status, isClosable: true, position: "top-right" });
	};

	const handleLogin = () => {
		const valid = validateData();
		if (!valid) {
			showAlert("warning", "All fields are mandatory");
			return;
		}

		dispatch(loginUser(userData));
		setUserData(initialData);
	};

	if (error) {
		showAlert("error", message);
		dispatch(clearMessage());
	}
	if (success) {
		showAlert("success", message);
		dispatch(clearMessage());
	}

	if (isAuth) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<Fragment>
			<Box bgGradient="linear(to-tr,pink.200,purple.300,cyan.300)">
				<Flex justify="center" align="center" h="calc(100vh - 80px)" px="4">
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
							<Text fontSize={{ base: "xl", md: "2xl" }}>Login to Moneyfi</Text>
						</Center>
						<FormControl>
							<VStack align="start" gap="4">
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
										onClick={handleLogin}
										boxShadow="xl"
										isLoading={loading}
										isDisabled={loading}
									>
										LOGIN
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
							<Text>Don't have an account.?</Text>
							<Link to="/signup">
								<Text fontWeight="semibold" color="purple.500">
									Signup
								</Text>
							</Link>
						</Flex>
					</Box>
				</Flex>
			</Box>
		</Fragment>
	);
}
