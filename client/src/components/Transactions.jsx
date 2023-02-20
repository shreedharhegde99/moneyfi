import { Box } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../store/user/user.action";
import TransactionCard from "./TransactionCard";
import "./styles/transactions.css";

export default function Transactions() {
	const { transactions } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTransactions());
	}, []);
	return (
		<Fragment>
			<Box
				maxW="container.lg"
				p={{ base: "2", md: "6" }}
				pb="20"
				maxH="calc(100vh - 90px)"
				overflowY="scroll"
				flex="1"
			>
				<Box maxW="lg" m="auto">
					{transactions.length
						? transactions.map((el) => (
								<TransactionCard data={el} key={el.date} />
						  ))
						: "No Transactions please start adding transactions to continue.."}
				</Box>
			</Box>
		</Fragment>
	);
}
