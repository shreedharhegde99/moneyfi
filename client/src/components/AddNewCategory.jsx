import { Fragment, useState } from "react";
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function AddNewCategory({ open, onClose, addCategory }) {
	const initData = { type: "income", name: "" };
	const [category, setCategory] = useState(initData);
	const { loading } = useSelector((state) => state.info);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategory({ ...category, [name]: value });
	};

	const formError = !category.name;

	return (
		<Fragment>
			<Modal isOpen={open} onClose={onClose}>
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
										onClick={() => addCategory(category)}
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
