/* eslint-disable react/jsx-no-target-blank */
import loglevel from "loglevel";
const log = loglevel.getLogger("HelpModal");
log.setLevel("info");

import React from "react";
import viewModel from "../BlockViewModel";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Modal, Button, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { StyledPrimaryButton } from "../StyledComponents";
const { Text, Paragraph } = Typography;
// import { Dialog, Heading, Text, Icon, Button } from "@airtable/blocks/ui";

const HelpModalTitle = () => {
	return (
		// <div style={{ display: "flex", alignItems: "center" }}>
		<Typography.Title level={4} style={{ marginBottom: "0px" }}>
			<QuestionCircleOutlined
				style={{
					marginRight: "6px",
				}}
			/>
			About eazyfields
		</Typography.Title>
		// </div>
	);
};

const HelpModalFooter = observer(() => {
	const onClick = () => {
		viewModel.showHelp = false;
	};

	return (
		<StyledPrimaryButton type="primary" onClick={onClick}>
			Close
		</StyledPrimaryButton>
	);
});

const StyledLI = styled.li`
	margin-bottom: 8px;
`;

const StyledModal = styled(Modal)`
	&& .ant-modal-header {
		border-radius: 6px 6px 0 0;
	}

	&& .ant-modal-content {
		border-radius: 6px;
	}
`;

const HelpModal = observer(() => {
	log.debug("HelpModal.render");

	if (!viewModel.showHelp) {
		return null;
	}

	return (
		<StyledModal
			visible={true}
			closable={false}
			centered={false}
			// centered={true}
			// onClose={onClose}
			// style={{ width: "min(400px, 80vw)", maxWidth: "80vw" }}
			title={<HelpModalTitle />}
			footer={<HelpModalFooter />}
		>
			<Paragraph style={{ marginBottom: "8px" }}>
				Eazyfields allows you to easily create single select fields with
				pre-populated options. You can:
			</Paragraph>
			<ul style={{ paddingLeft: "20px" }}>
				<StyledLI>
					<Text>
						Create country, month and day of week fields in any world language.
					</Text>
				</StyledLI>
				<StyledLI>
					<Text>Create a year field and set the options range.</Text>
				</StyledLI>
				<StyledLI>
					<Text>
						Create a time field and set the options range and the gap in minutes
						between options.
					</Text>
				</StyledLI>
			</ul>
			<Paragraph>
				<a href="https://eazyform.app/form/mf-29524969" target="_blank">
					Contact us
				</a>{" "}
				if you have improvement suggestions and please report issues{" "}
				<a
					href="https://github.com/eazyapps/eazyfields-airtable-app/issues"
					target="_blank"
				>
					here.
				</a>
			</Paragraph>
			<Paragraph style={{ fontWeight: 500, marginBottom: 0 }}>
				For a full list of our airtable apps and services, see{" "}
				<a href="https://www.eazyapps.dev/airtable" target="_blank">
					here.
				</a>
			</Paragraph>
		</StyledModal>
	);
});

export default HelpModal;
