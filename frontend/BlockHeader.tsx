import log from "loglevel";
log.setLevel("debug");

import React from "react";

import styled from "styled-components";

import { Layout } from "antd";
const { Header } = Layout;

import { StyledLink } from "./StyledComponents";

const StyledLogo = styled.img`
	max-height: 20px;
	vertical-align: middle;
`;

const BlockHeader = () => {
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
			<StyledLink href="https://superblocks.at" target="_blank">
				<StyledLogo src="https://superblocks.at/superblocks-domain-logo-2/" />
			</StyledLink>
		</Header>
	);
};

export default BlockHeader;
