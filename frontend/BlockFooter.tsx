import log from "loglevel";
log.setLevel("debug");

import React from "react";

import styled from "styled-components";

import { Layout, Typography } from "antd";
const { Footer } = Layout;
const { Text } = Typography;

import { StyledLink } from "./StyledComponents";

const StyledLogo = styled.img`
	max-height: 16px;
	vertical-align: middle;
`;

export default function BlockFooter() {
	return (
		<Footer
			style={{
				position: "fixed",
				overflow: "hidden",
				bottom: 0,
				zIndex: 1,
				height: "24px",
				width: "100%",
				paddingTop: 0,
				paddingBottom: 0,
				backgroundColor: "white",
				boxShadow: "rgba(0,0,0,0.1) 0 -2px 0 0",
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
				paddingRight: "8px",
			}}
		>
			<Text
				style={{
					verticalAlign: "middle",
					display: "inline-block",
					marginRight: "4px",
				}}
			>
				Powered by{" "}
			</Text>
			<StyledLink href="https://superblocks.at" target="_blank">
				<StyledLogo src="https://superblocks.at/superblocks-domain-logo-2/" />
			</StyledLink>
		</Footer>
	);
}
