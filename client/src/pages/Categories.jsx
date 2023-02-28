import {
	Box,
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
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import NewButton from "../components/NewButton";
import { MdEdit } from "react-icons/md";
import { addNewCategory } from "../store/user/user.action";
import { clearMessage } from "../store/info/info.action";
import getToken from "../utils/getToken";
import AddNewCategory from "../components/AddNewCategory";

export default function Categories() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const toast = useToast();
	const userToken = getToken();
	const { categories } = useSelector((state) => state.user);
	const { error, success, message } = useSelector((state) => state.info);

	const handleAddCategory = (category) => {
		if (category.name && category.type) {
			dispatch(addNewCategory(category, userToken));
			onClose();
		}
	};

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
			<NewButton onClick={onOpen} />
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
			<AddNewCategory
				addCategory={handleAddCategory}
				open={isOpen}
				onClose={onClose}
			/>
		</Fragment>
	);
}
