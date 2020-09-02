import loglevel from "loglevel";
const log = loglevel.getLogger("MainMenu");
log.setLevel("debug");

import React from "react";

import { Menu } from "antd";

import styled from "styled-components";
import { Icon } from "@airtable/blocks/ui";

import { StyledMenuItem } from "./StyledComponents";

import { observer } from "mobx-react-lite";

import viewModel, { EazyfieldType } from "./BlockViewModel";

const StyledIcon = styled(Icon)`
	margin-right: 10px;
	text-align: center;
	vertical-align: -3px;
	/* line-height: 30px; */
`;

const MainMenu = observer(() => {
	log.debug("MainMenu.render");

	const onSelect = ({ key }) => {
		log.debug("MainMenu.onSelect, key:", key);
		viewModel.activeEazyfieldType = key;
	};

	return (
		// <>
		// 	<div
		// 		style={{
		// 			height: "32px",
		// 			width: "100%",
		// 			boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.1)",
		// 			marginBottom: "2px",
		// 			display: "flex",
		// 			alignItems: "center",
		// 			paddingLeft: "8px",
		// 		}}
		// 	>
		// 		<Text>Type of field to create:</Text>
		// 	</div>
		<Menu
			mode="inline"
			selectedKeys={[viewModel.activeEazyfieldType]}
			onSelect={onSelect}
		>
			<StyledMenuItem
				disabled={!viewModel.hasPermissions}
				key={EazyfieldType.country}
				icon={<StyledIcon name="public" />}
			>
				Country
			</StyledMenuItem>
			<StyledMenuItem
				disabled={!viewModel.hasPermissions}
				key={EazyfieldType.year}
				icon={<StyledIcon name="day" />}
			>
				Year
			</StyledMenuItem>
			<StyledMenuItem
				disabled={!viewModel.hasPermissions}
				key={EazyfieldType.month}
				icon={<StyledIcon name="day" />}
			>
				Month
			</StyledMenuItem>
			<StyledMenuItem
				disabled={!viewModel.hasPermissions}
				key={EazyfieldType.weekday}
				icon={<StyledIcon name="day" />}
			>
				Day of week
			</StyledMenuItem>
			<StyledMenuItem
				disabled={!viewModel.hasPermissions}
				key={EazyfieldType.time}
				icon={<StyledIcon name="time" />}
			>
				Time
			</StyledMenuItem>
		</Menu>
		// </>
	);
});

export default MainMenu;
