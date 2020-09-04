import loglevel from "loglevel";
const log = loglevel.getLogger("ErrorBoundary");
// log.setLevel("debug");

import React, { Component } from "react";

import { Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Icon, Button } from "@airtable/blocks/ui";
import { BrandModal } from "./BrandComponents";
const { Title, Paragraph, Text } = Typography;

const ModalHeader = () => {
	return (
		<>
			<Icon name="warning" size={20} style={{ verticalAlign: "-2px" }} />
			<Title level={4} style={{ margin: "0 0 0 8px", display: "inline-block" }}>
				Oops, something went wrong
			</Title>
		</>
	);
};

const ModalBody = ({ errorDesc }: { errorDesc: string }) => {
	const href = `mailto:support@superblocks.at`;

	return (
		<>
			<Paragraph>{"We're sorry, something went wrong."}</Paragraph>
			<Paragraph>
				Please contact <a href={href}>support@superblocks.at</a> if the problem
				persists. Please include the the error description in your email.
			</Paragraph>
			<Text copyable={{ text: errorDesc }}>
				Click the copy icon to copy the error description.
			</Text>
		</>
	);
};

const ModalFooter = () => {
	return (
		<Button
			onClick={() => location.reload()}
			variant="primary"
			icon={<ReloadOutlined />}
		>
			Reload block
		</Button>
	);
};

interface ErrorBoundaryState {
	hasError: boolean;
	message: string | null;
	error: Error | null;
}

export default class ErrorBoundary extends Component {
	state: ErrorBoundaryState;

	constructor(props) {
		log.debug("ErrorBoundary.constructor");
		super(props);
		this.state = {
			hasError: false,
			message: null,
			error: null,
		};
		window.addEventListener("error", this.onWindowError.bind(this));
	}

	onWindowError(message: string | Error, source, lineno, colno, error: Error) {
		const ResizeObserverErrorMessage = "ResizeObserver loop limit exceeded";
		if (
			(message &&
				((typeof error === "string" &&
					message.toString().indexOf(ResizeObserverErrorMessage)) ||
					(message instanceof ErrorEvent &&
						message.message.indexOf(ResizeObserverErrorMessage) != -1))) ||
			(error && error.message.indexOf(ResizeObserverErrorMessage) != -1)
		) {
			log.debug(
				"ErrorBoundary.onWindowError - the error is 'ResizeObserver loop limit exceeded' - a save to ignore error. Ignoring it."
			);
			return;
		}
		log.error(
			"ErrorBoundary.onWindowError, message:",
			message,
			", error:",
			error
		);
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state = {
			hasError: true,
			message: message,
			error: error,
		};
	}

	static getDerivedStateFromError(error: Error) {
		log.error("ErrorBoundary.getDerivedStateFromError, error:", error);
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error: error };
	}

	getErrorDescToSend() {
		let body = "";

		if (this.state.message) {
			body += `Message: ${this.state.message}\n\n`;
		}
		if (this.state.error) {
			if (this.state.error.name && this.state.error.name.length > 0) {
				body += `Error name: ${this.state.error.name}\n\n`;
			}
			if (this.state.error.message && this.state.error.message.length > 0) {
				body += `Error message: ${this.state.error.message}\n\n`;
			}
			if (this.state.error.stack) {
				body += `Stack trace:\n\n${this.state.error.stack}\n`;
			}
		}

		return body;
	}

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		// this.setState({
		// 	error: error,
		// 	errorInfo: errorInfo,
		// });
		log.error(
			"ErrorBoundary.componentDidCatch, error:\n\n",
			error,
			"\n\nerrorInfo:\n\n",
			errorInfo
		);
	}

	render() {
		log.debug("ErrorBoundary.render");
		if (this.state.hasError) {
			// Error path
			return (
				<BrandModal
					visible={true}
					closable={false}
					title={<ModalHeader />}
					footer={<ModalFooter />}
				>
					<ModalBody errorDesc={this.getErrorDescToSend()} />
				</BrandModal>
			);
		}
		// Normally, just render children
		return this.props.children;
	}
}
