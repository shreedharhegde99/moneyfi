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
	Select,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewTransaction,
	getChartData,
	getTransactions,
} from "../store/user/user.action";
import getDayMs from "../utils/getDayMs";
import getToken from "../utils/getToken";
import NewButton from "./NewButton";

export default function AddTransaction({ dateRange }) {
	const initData = {
		type: "income",
		category: "salary",
		amount: 55000,
		date: "2023-02-15",
	};
	const [transaction, setTransaction] = useState(initData);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { categories } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.info);
	const dispatch = useDispatch();
	const userToken = getToken();

	const formError = !(
		transaction.amount &&
		transaction.type &&
		transaction.category &&
		transaction.date
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTransaction({ ...transaction, [name]: value });
	};

	const handleAddTransaction = () => {
		const { type, category, amount, date } = transaction;
		let time = getDayMs(date);

		if (type && category && amount && date) {
			dispatch(addNewTransaction({ ...transaction, date: time }, userToken));
			setTransaction(initData);
			onClose();
			dispatch(getTransactions(dateRange, userToken));
			dispatch(getChartData(dateRange, userToken));
		}
	};

	return (
		<Fragment>
			<NewButton onClick={onOpen} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay backdropFilter="blur(10px)">
					<ModalContent p="4">
						<ModalHeader>Add new transaction</ModalHeader>
						<ModalCloseButton />
						<FormControl isRequired={true} isInvalid={formError}>
							<Stack gap="4">
								<Box>
									<FormLabel>Transaction Type</FormLabel>
									<RadioGroup
										name="type"
										defaultValue={transaction.type}
										onChange={(value) =>
											setTransaction({ ...transaction, type: value })
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
									<FormLabel>Select category</FormLabel>
									<Select
										name="category"
										value={transaction.category}
										onChange={handleChange}
										isRequired={true}
									>
										{categories.map((el) => (
											<option
												value={el.name}
												key={el._id}
												color={
													el.category === "income" ? "green.100" : "red.100"
												}
											>
												{el.name}
											</option>
										))}
									</Select>
								</Box>
								<Box>
									<FormLabel>Amount</FormLabel>
									<Input
										type="number"
										name="amount"
										placeholder="Amount"
										isRequired={true}
										value={transaction.amount}
										onChange={handleChange}
									/>
								</Box>
								<Box>
									<FormLabel>Date</FormLabel>
									<Input
										type="date"
										name="date"
										isRequired={true}
										value={transaction.date}
										onChange={handleChange}
									/>
								</Box>
								<Box>
									<Button
										variant="solid"
										colorScheme="telegram"
										w="full"
										onClick={handleAddTransaction}
										isLoading={loading}
									>
										Add Transaction
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
