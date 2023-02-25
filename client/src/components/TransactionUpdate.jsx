import { Fragment, useEffect, useState } from "react";
import {
	Box,
	Button,
	Flex,
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
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import getFormattedDay from "../utils/getFormattedDay";
import getToken from "../utils/getToken";
import {
	getChartData,
	getTransactions,
	removeTransaction,
	updateTransaction,
} from "../store/user/user.action";
import getDayMs from "../utils/getDayMs";

export default function TransactionUpdate({
	isOpen,
	onClose,
	currentEl,
	dateRange,
}) {
	const [editEl, setEditEl] = useState(currentEl);
	const { categories } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.info);
	const dispatch = useDispatch();
	const token = getToken();

	useEffect(() => {
		setEditEl(currentEl);
	}, [currentEl]);

	const syncTransactionList = () => {
		dispatch(getTransactions(dateRange, token));
		dispatch(getChartData(dateRange, token));
		onClose();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditEl({ ...editEl, [name]: value });
	};
	const updateUserTransaction = () => {
		let { date } = editEl;
		let dateMs = getDayMs(date);
		dispatch(updateTransaction({ ...editEl, date: dateMs }, token));
		syncTransactionList();
	};

	const deleteTransaction = () => {
		dispatch(removeTransaction(editEl._id, token));
		syncTransactionList();
	};

	return (
		<Fragment>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay backdropFilter="blur(10px)">
					<ModalContent p="4">
						<ModalHeader>Update Transaction</ModalHeader>
						<ModalCloseButton />
						<FormControl isRequired={true} isInvalid={true}>
							<Stack gap="4">
								<Box>
									<FormLabel>Transaction Type</FormLabel>
									<RadioGroup
										name="type"
										defaultValue={editEl.type}
										onChange={(value) => setEditEl({ ...editEl, type: value })}
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
										value={editEl.category}
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
										value={editEl.amount}
										onChange={handleChange}
									/>
								</Box>
								<Box>
									<FormLabel>Date</FormLabel>
									<Input
										type="date"
										name="date"
										isRequired={true}
										value={getFormattedDay(editEl.date)}
										onChange={handleChange}
									/>
								</Box>
								<Flex justify="space-between" gap="2">
									<Button
										variant="solid"
										colorScheme="telegram"
										// w="full"
										onClick={updateUserTransaction}
										isLoading={loading}
									>
										Update Transaction
									</Button>
									<Button
										variant="solid"
										colorScheme="red"
										// w="full"
										onClick={deleteTransaction}
										isLoading={loading}
									>
										Remove Transaction
									</Button>
								</Flex>
							</Stack>
							{
								/* formError */ true && (
									<FormErrorMessage>
										All fields are mandatory.!{" "}
									</FormErrorMessage>
								)
							}
						</FormControl>
					</ModalContent>
				</ModalOverlay>
			</Modal>
		</Fragment>
	);
}
