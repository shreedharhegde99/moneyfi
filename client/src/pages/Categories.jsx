import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import NewButton from "../components/NewButton";
import { MdEdit } from "react-icons/md";
import { addNewCategory, getCategories } from "../store/user/user.action";
import { clearMessage } from "../store/info/info.action";

export default function Categories() {
	const initData = { type: "income", name: "" };
	const [category, setCategory] = useState(initData);
	const {
		isOpen: formOpen,
		onOpen: onFormOpen,
		onClose: formClose,
	} = useDisclosure();
	const dispatch = useDispatch();
	const toast = useToast();

	const { categories } = useSelector((state) => state.user);
	const { loading, error, success, message } = useSelector(
		(state) => state.info
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategory({ ...category, [name]: value });
	};

	const handleAddCategory = () => {
		if (category.name && category.type) {
			dispatch(addNewCategory(category));
			setCategory(initData);
			formClose();
		}
	};
	const formError = !category.name;

	if (error) {
		toast({ title: message, status: "error", position: "top-right" });
		dispatch(clearMessage());
	}
	if (success) {
		toast({ title: message, status: "success", position: "top-right" });
		dispatch(clearMessage());
	}

	return (
		<Fragment>
			<NewButton onClick={onFormOpen} />
			<Box maxW="container.md" m="auto" py="10">
				<TableContainer>
					<Table>
						<Thead textAlign="center">
							<Tr bg="purple.100">
								<Th color="blue.500" fontSize="sm">
									Type
								</Th>
								<Th color="blue.500" fontSize="sm">
									Category
								</Th>
								<Th color="blue.500" fontSize="sm">
									Update
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{categories.map((el) => (
								<Fragment key={el._id}>
									<Tr bg={el.type === "income" ? "green.100" : "red.100"}>
										<Td>
											{el.type === "income" ? (
												<AiOutlinePlusCircle size="1.2rem" color="green" />
											) : (
												<AiOutlineMinusCircle size="1.2rem" color="red" />
											)}
										</Td>
										<Td> {el.name}</Td>
										<Td cursor="pointer">
											<MdEdit />
										</Td>
									</Tr>
								</Fragment>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
			<Modal isOpen={formOpen} onClose={formClose}>
				<ModalOverlay backdropFilter="blur(10px)">
					<ModalContent p="4">
						<ModalHeader>Add new Category</ModalHeader>
						<ModalCloseButton />
						<FormControl isRequired={true} isInvalid={formError}>
							<Stack gap="4">
								<Box>
									<FormLabel>Category Type</FormLabel>
									<RadioGroup
										name="type"
										defaultValue={category.type}
										onChange={(value) =>
											setCategory({ ...category, type: value })
										}
									>
										<HStack>
											<Radio value="income" colorScheme="green">
												Income
											</Radio>
											<Radio value="expense" colorScheme="red">
												Expense
											</Radio>
										</HStack>
									</RadioGroup>
								</Box>
								<Box>
									<FormLabel> Category name</FormLabel>
									<Input
										name="name"
										value={category.name}
										onChange={handleChange}
										isRequired={true}
									/>
								</Box>

								<Box>
									<Button
										variant="solid"
										colorScheme="telegram"
										w="full"
										onClick={handleAddCategory}
										isLoading={loading}
									>
										Add Category
									</Button>
								</Box>
							</Stack>
							{formError && (
								<FormErrorMessage>All fields are mandatory.! </FormErrorMessage>
							)}
						</FormControl>
					</ModalContent>
				</ModalOverlay>
			</Modal>
		</Fragment>
	);
}
