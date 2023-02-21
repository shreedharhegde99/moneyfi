import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarMini({ handleAuth }) {
	const { isAuth } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleAuthStatus = () => {
		handleAuth();
		onClose();
	};

	return (
		<Fragment>
			<Box>
				<IconButton
					icon={<RxHamburgerMenu size="1.5rem" />}
					variant="unstyled"
					onClick={onOpen}
				/>
				<Drawer
					placement="right"
					onClose={onClose}
					isOpen={isOpen}
					isFullHeight={false}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerBody>
							<VStack align="start" py="4" fontSize="xl">
								{!isAuth ? (
									<Link to="/signup" onClick={onClose}>
										<Box>Signup</Box>
									</Link>
								) : (
									<Fragment>
										<Link to="/dashboard">
											<Box>Dashboard</Box>
										</Link>
										<Link to="/categories">
											<Box>Categories</Box>
										</Link>
										<Link to="/charts">
											<Box>Transaction Charts</Box>
										</Link>
									</Fragment>
								)}

								<Box onClick={handleAuthStatus}>
									{isAuth ? "Logout" : "Login"}
								</Box>
							</VStack>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Box>
		</Fragment>
	);
}
