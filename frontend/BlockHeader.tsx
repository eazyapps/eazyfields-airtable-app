import loglevel from "loglevel";
const log = loglevel.getLogger("BlockHeader");
log.setLevel("info");

import React from "react";

import styled from "styled-components";

import { Layout } from "antd";
const { Header } = Layout;

import { StyledLogoWrapper, StyledLogoText } from "./StyledComponents";

const StyledLogo = styled.img`
	height: 16px;
`;

const BlockHeader = ({ title, children }: { title: string; children?: any }) => {
	log.debug("BlockHeader.render");

	return (
		<Header
			style={{
				position: "fixed",
				overflow: "hidden",
				top: 0,
				zIndex: 1,
				height: "32px",
				lineHeight: "32px",
				width: "100%",
				backgroundColor: "white",
				boxShadow: "rgba(0,0,0,0.1) 0 2px 0 0",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				paddingLeft: "12px",
				paddingRight: "12px",
			}}
		>
			<StyledLogoWrapper href="https://eazyapps.dev/airtable" target="_blank">
				<StyledLogo src="https://cdn.eazyapps.dev/eazyapps-logo.svg" />
				<StyledLogoText strong={true}>{title}</StyledLogoText>
			</StyledLogoWrapper>
			{children}
		</Header>
	);
};

export default BlockHeader;
