import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Hide,
	HStack,
	Show,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUserAuth } from "../store/auth/auth.action";
import clearToken from "../utils/clearToken";
import NavbarMini from "./NavbarMini";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isAuth } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleUserAuthState = () => {
		if (isAuth) {
			dispatch(updateUserAuth(false));
			clearToken();
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
					maxW={{ base: "full", md: "container.md", lg: "container.xl" }}
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
							<HStack fontSize="xl" fontWeight="medium" px="2" py="1">
								{isAuth && (
									<Link to="/dashboard">
										<Box
											px="2"
											py="1"
											_hover={{ bg: "cyan.100", borderRadius: "lg" }}
										>
											Dashboard
										</Box>
									</Link>
								)}
								{!isAuth && (
									<Link to="/signup">
										<Box
											px="2"
											py="1"
											_hover={{ bg: "cyan.100", borderRadius: "lg" }}
										>
											Signup
										</Box>
									</Link>
								)}
								{
									<Box
										cursor="pointer"
										px="2"
										py="1"
										_hover={{ bg: "cyan.100", borderRadius: "lg" }}
										onClick={handleUserAuthState}
									>
										{isAuth ? "Logout" : "Login"}
									</Box>
								}
								{isAuth && (
									<Fragment>
										<Box onClick={onOpen} cursor="pointer">
											<RxHamburgerMenu size="1.4rem" color="black" />
										</Box>
										<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
											<DrawerOverlay />
											<DrawerContent>
												<DrawerCloseButton />
												<DrawerHeader />

												<DrawerBody>
													<Link to="/categories">
														<Box>Categories</Box>
													</Link>
												</DrawerBody>
											</DrawerContent>
										</Drawer>
									</Fragment>
								)}
							</HStack>
						</Hide>
					</Box>
				</Flex>
			</Box>
		</Fragment>
	);
}
