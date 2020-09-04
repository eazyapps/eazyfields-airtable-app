import loglevel from "loglevel";
const log = loglevel.getLogger("EazyfieldsBlock");
// log.setLevel("debug");

import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import BlockHeader from "./BlockHeader";
import BlockFooter from "./BlockFooter";
import {
	StyledSider,
	StyledFormContent,
	StyledFormLayout,
} from "./StyledComponents";
import MainMenu from "./MainMenu";
import EazyfieldRouter from "./EazyfieldRouter";
import HelpModal from "./components/HelpModal";
import { Button } from "@airtable/blocks/ui";
import viewModel from "./BlockViewModel";
import BaseTracker from "./BaseTracker";

const StyledHelpButton = styled(Button)`
	&&:focus {
		box-shadow: none;
	}
`;

const ShowHelpButton = () => {
	log.debug("ShowHelpButton.render");

	const onClick = () => {
		log.debug("ShowHelpButton.onClick");

		viewModel.showHelp = true;
	};

	return (
		<StyledHelpButton
			onClick={onClick}
			icon="help"
			style={{ backgroundColor: "transparent" }}
		/>
	);
};

export default function EazyfieldsBlock() {
	return (
		<ErrorBoundary>
			<Layout
				style={{
					position: "fixed",
					top: "34px",
					bottom: "26px",
					left: 0,
					right: 0,
					paddingTop: 0,
					paddingBottom: 0,
				}}
			>
				<BlockHeader title="Eazyfields">
					<ShowHelpButton />
				</BlockHeader>
				<StyledSider theme="light" width="220px">
					<MainMenu />
				</StyledSider>
				<StyledFormLayout>
					<StyledFormContent>
						<BaseTracker />
						<EazyfieldRouter />
					</StyledFormContent>
				</StyledFormLayout>
				<HelpModal />
				<BlockFooter />
			</Layout>
		</ErrorBoundary>
	);
}
