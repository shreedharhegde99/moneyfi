import { Box } from "@chakra-ui/react";
import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isError: false,
		};
	}

	componentDidCatch(err, info) {
		console.log(err);
		console.log(info);
		this.setState({ isError: true });
	}

	render() {
		const { isError } = this.state;

		if (isError) {
			return <Box>Something went wrong</Box>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
