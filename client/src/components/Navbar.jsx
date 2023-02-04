import { Box, Flex, Hide, HStack, Show, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUserAuth } from "../store/auth/auth.action";
import NavbarMini from "./NavbarMini";

export default function Navbar() {
	const { isAuth } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleUserAuthState = () => {
		if (isAuth) {
			dispatch(updateUserAuth(false));
		}
		navigate("/login");
	};

	return (
		<Fragment>
			<Box
				p="4"
				position="sticky"
				top="0"
				left="0"
				zIndex="2"
				boxShadow="xl"
				bg="azure"
			>
				<Flex
					maxW={{ base: "full", md: "container.md", lg: "container.lg" }}
					m="auto"
					justify="space-between"
					align="baseline"
				>
					<Link to="/">
						<Box fontSize="3xl" fontWeight="bold">
							<Text
								bgGradient="linear(to-r,blue.500,pink.400,cyan.500)"
								bgClip="text"
								letterSpacing="wider"
							>
								Moneyfi
							</Text>
						</Box>
					</Link>
					<Box>
						<Show below="md">
							<NavbarMini handleAuth={handleUserAuthState} />
						</Show>
						<Hide below="md">
							<HStack fontSize="xl" fontWeight="medium">
								<Box>Dashboard</Box>
								{!isAuth && (
									<Link to="/signup">
										<Box>Signup</Box>
									</Link>
								)}
								{
									<Box cursor="pointer" onClick={handleUserAuthState}>
										{isAuth ? "Logout" : "Login"}
									</Box>
								}
							</HStack>
						</Hide>
					</Box>
				</Flex>
			</Box>
		</Fragment>
	);
}
