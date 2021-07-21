import loglevel from "loglevel";

import React from "react";

import styled from "styled-components";

import { Layout, Typography, Button } from "antd";
const { Footer } = Layout;
const { Text } = Typography;

import { EditOutlined } from "@ant-design/icons";

import { StyledLogoWrapper, StyledLogoText } from "./StyledComponents";

const log = loglevel.getLogger("BlockFooter");
log.setLevel("info");

const StyledLogo = styled.img`
	height: 12px;
`;

const StyledFooterLogoText = styled(StyledLogoText)`
	margin-left: 4px;
`;

export default function BlockFooter({
	position = "fixed",
	bottom = 0,
}: {
	position?: "fixed" | "absolute" | "relative" | "initial";
	bottom?: number | "initial";
}) {
	log.debug("Footer.render");

	const onFeedback = () => {
		window.open("https://superblocks.at/eazyfields-block-feedback", "_blank");
	};

	return (
		<Footer
			style={{
				position: position,
				overflow: "hidden",
				bottom: bottom,
				zIndex: 200,
				height: "24px",
				width: "100%",
				backgroundColor: "white",
				boxShadow: "rgba(0,0,0,0.1) 0 -2px 0 0",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "0 8px 0 0",
			}}
		>
			<Button
				size="small"
				type="text"
				icon={<EditOutlined />}
				onClick={onFeedback}
				style={{ height: "100%" }}
			>
				Feedback? Let us know.
			</Button>
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						verticalAlign: "middle",
						display: "inline-block",
						marginRight: "4px",
					}}
				>
					Powered by:{" "}
				</Text>
				<StyledLogoWrapper href="https://eazyapps.dev/airtable" target="_blank">
					<StyledLogo src="https://cdn.eazyapps.dev/eazyapps-logo.svg" />
					<StyledFooterLogoText strong={true}>Eazyapps</StyledFooterLogoText>
				</StyledLogoWrapper>
			</div>
		</Footer>
	);
}
