import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "./TransactionCard";
import "./styles/transactions.css";

export default function Transactions({ dateRange }) {
	const { transactions } = useSelector((state) => state.user);

	return (
		<Fragment>
			<Box
				maxW="container.lg"
				p={{ base: "2", md: "6" }}
				pb="20"
				maxH="calc(100vh - 90px)"
				overflowY="scroll"
			>
				<Box maxW="lg" m="auto">
					{transactions.length ? (
						<Box>
							{transactions.map((el) => (
								<TransactionCard
									key={el.date}
									data={el}
									dateRange={dateRange}
								/>
							))}
						</Box>
					) : (
						"No Transactions please start adding transactions to continue.."
					)}
				</Box>
			</Box>
		</Fragment>
	);
}
