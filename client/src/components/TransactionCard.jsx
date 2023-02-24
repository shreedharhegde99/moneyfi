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
	Tooltip,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import getDailyTotal from "../utils/getDailyTotal";
import getDate from "../utils/getDate";
import { useSelector } from "react-redux";
import getFormattedDay from "../utils/getFormattedDay";

export default function TransactionCard({ data }) {
	const [editEl, setEditEl] = useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	let total = getDailyTotal(data.transactions);
	const { categories } = useSelector((state) => state.user);
	const { loading } = useSelector((state) => state.info);

	const initiateEditEl = (el) => {
		setEditEl(el);
		onOpen(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditEl({ ...editEl, [name]: value });
	};
	const updateUserTransaction = () => {
		console.log(editEl);
	};

	return (
		<Fragment>
			<Box py="5">
				<Flex justify="space-between" fontSize="md" fontWeight="bold" px="2">
					<Box>{getDate(data.date)}</Box>
					<Box color={total >= 0 ? "green.500" : "red.500"}>
						{`${total >= 0 ? "+" : ""}${total}`}
					</Box>
				</Flex>
				<Tooltip label={"Click to update / delete"} offset={[200, 5]}>
					<Box cursor="pointer">
						{data.transactions.map((el) => (
							<Flex
								justify="space-between"
								align="center"
								key={el._id}
								bg={el.type === "income" ? "green.200" : "red.200"}
								p="3"
								px="4"
								my="3"
								borderRadius="2xl"
								position="relative"
								onClick={() => initiateEditEl(el)}
							>
								<Flex gap="8" align="center">
									<Box fontWeight="semibold" mb="-0.5">
										{el.type === "income" ? (
											<AiOutlinePlus size="1.2rem" />
										) : (
											<AiOutlineMinus size="1.2rem" />
										)}
									</Box>
									<Box fontSize="lg">{el.category}</Box>
								</Flex>
								<Flex align="center" gap="1">
									<Box>
										<BiRupee size="1.2rem" />
									</Box>
									<Box minW="10">{el.amount}</Box>
								</Flex>
							</Flex>
						))}
					</Box>
				</Tooltip>
			</Box>

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
										onClick={updateUserTransaction}
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
