import loglevel from "loglevel";
const log = loglevel.getLogger("HelpModal");
log.setLevel("debug");

import React from "react";
import viewModel from "../BlockViewModel";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Dialog, Heading, Text, Icon, Button } from "@airtable/blocks/ui";

// const HelpModalTitle = observer(() => {
// 	return (
// 		<div style={{ display: "flex", alignItems: "center" }}>
// 			<QuestionCircleOutlined
// 				style={{
// 					lineHeight: "28px",
// 					marginBottom: "10px",
// 					position: "relative",
// 					top: "3px",
// 				}}
// 			/>
// 			<Typography.Title level={4} style={{ marginLeft: "8px" }}>
// 				About eazyfields
// 			</Typography.Title>
// 		</div>
// 	);
// });

// const HelpModalFooter = observer(() => {
// 	const onClick = () => {
// 		viewModel.showHelpModal = false;
// 	};

// 	return (
// 		<Button type="primary" onClick={onClick}>
// 			Close
// 		</Button>
// 	);
// });

const StyledLI = styled.li`
	margin-bottom: 8px;
`;

const HelpModal = observer(() => {
	if (!viewModel.showHelp) {
		return null;
	}

	const onClose = () => {
		viewModel.showHelp = false;
	};

	return (
		<Dialog onClose={onClose} width="calc(50vw)">
			<Dialog.CloseButton />
			<Heading style={{ marginBottom: "16px" }}>
				<Icon name="help" size={16} style={{ marginRight: "8px" }} />
				About Eazyfield
			</Heading>
			<Text style={{ marginBottom: "8px" }}>
				Eazyfields allows you to easily create single select fields with
				pre-populated options. You can:
			</Text>
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
						Create a time / time slot field and set the options range and the
						gap in minutes between the options.
					</Text>
				</StyledLI>
			</ul>
			<Text>
				<a href="https://superblocks.at/" target="_blank">
					Contact us
				</a>{" "}
				if you have improvement suggestions and please report issues
				<a
					href="https://github.com/superblocks-at/eazyfields-block/issues"
					target="_blank"
				>
					{" "}
					here.
				</a>
			</Text>
			<Button variant="primary" onClick={onClose} style={{ marginTop: "16px" }}>
				Close
			</Button>
		</Dialog>
	);
});

export default HelpModal;
