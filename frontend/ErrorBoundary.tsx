import loglevel from "loglevel";
const log = loglevel.getLogger("ErrorBoundary");
log.setLevel("debug");

import React, { Component } from "react";

import { Button, Alert, Typography, Collapse } from "antd";
import {
	CaretRightOutlined,
	ReloadOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const ErrorMessage = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				marginBottom: "10px",
			}}
		>
			<ExclamationCircleOutlined
				style={{
					fontSize: "24px",
					marginRight: "8px",
					color: "#ff4d4f",
				}}
			/>
			<Title level={4} style={{ margin: 0 }}>
				Oops, something went wrong
			</Title>
		</div>
	);
};

const ErrorDescription = ({
	message,
	error,
}: {
	message: string | null;
	error: Error | null;
}) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Paragraph>
				Please contact{" "}
				<a href="mailto:support@superblocks.at">support@superblocks.at</a> if
				the problem persists.
			</Paragraph>
			<Collapse
				bordered={false}
				expandIcon={({ isActive }) => (
					<CaretRightOutlined rotate={isActive ? 90 : 0} />
				)}
				style={{ backgroundColor: "transparent", border: "none" }}
			>
				<Panel
					key="details"
					header="Details"
					style={{ backgroundColor: "transparent", border: "none" }}
				>
					{message ? (
						<Paragraph>window.onerror message: {message}</Paragraph>
					) : null}
					{error && error.name ? (
						<Paragraph>Error name: {error.name}</Paragraph>
					) : null}
					{error && error.message ? (
						<Paragraph>Error message: {error.message}</Paragraph>
					) : null}
					{error && error.stack ? (
						<>
							<Paragraph>Error stack:</Paragraph>
							<Paragraph>{error.stack.toString()}</Paragraph>
						</>
					) : null}
				</Panel>
			</Collapse>
			<Button
				onClick={() => location.reload()}
				type="primary"
				icon={<ReloadOutlined />}
			>
				Reload Block
			</Button>
		</div>
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

	onWindowError(message, source, lineno, colno, error) {
		log.error(
			"ErrorBoundary.onWindowError, message:",
			message,
			", error:",
			error
		);
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
			const error: Error = this.state.error;
			const description = (
				<ErrorDescription
					message={this.state.message}
					error={this.state.error}
				/>
			);
			return (
				<Alert
					type="error"
					message={<ErrorMessage />}
					description={description}
					style={{
						position: "fixed",
						width: "100vw",
						height: "100vh",
						top: 0,
						left: 0,
						zIndex: 100,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				/>
			);
		}
		// Normally, just render children
		return this.props.children;
	}
}
