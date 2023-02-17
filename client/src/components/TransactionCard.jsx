import { Box, Flex } from "@chakra-ui/react";
import { Fragment } from "react";
import { BiRupee } from "react-icons/bi";

import getDate from "../utils/getDate";

export default function TransactionCard({ data }) {
	return (
		<Fragment>
			<Box py="2">
				<Box>{getDate(data.date)}</Box>
				<Box>
					{data.transactions.map((el) => (
						<Flex justify="space-between" key={el._id}>
							<Flex>
								<Box>{el.type === "income" ? "+" : "-"}</Box>
								<Box>{el.category}</Box>
							</Flex>
							<Flex>
								<BiRupee />
								{el.amount}
							</Flex>
						</Flex>
					))}
				</Box>
			</Box>
		</Fragment>
	);
}
