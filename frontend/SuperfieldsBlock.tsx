import React from "react";
import { Layout } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import BlockHeader from "./BlockHeader";
import BlockFooter from "./BlockFooter";
import {
	StyledInnerLayout,
	StyledSider,
	StyledContent,
	StyledFormContent,
	StyledFormLayout,
} from "./StyledComponents";
import MainMenu from "./MainMenu";
import SuperfieldRouter from "./SuperfieldRouter";

export default function SupefieldsBlock() {
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
				<BlockHeader />
				<StyledSider theme="light" width="220px">
					<MainMenu />
				</StyledSider>
				<StyledFormLayout>
					<StyledFormContent>
						<SuperfieldRouter />
					</StyledFormContent>
				</StyledFormLayout>
				<BlockFooter />
			</Layout>
		</ErrorBoundary>
	);
}
