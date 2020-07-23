import loglevel from "loglevel";
const log = loglevel.getLogger("MainMenu");
// log.setLevel("debug");

import React from "react";

import { Typography } from "antd";
const { Text } = Typography;
import { DragOutlined, InteractionOutlined } from "@ant-design/icons";
import { StyledMenuItem } from "./StyledComponents";

import { observer } from "mobx-react-lite";

import viewModel, { EazyfieldType } from "./BlockViewModel";
import { Menu } from "antd";

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
			<StyledMenuItem key={EazyfieldType.country} icon={<DragOutlined />}>
				Country
			</StyledMenuItem>
			<StyledMenuItem key={EazyfieldType.year} icon={<InteractionOutlined />}>
				Year
			</StyledMenuItem>
			<StyledMenuItem key={EazyfieldType.month} icon={<InteractionOutlined />}>
				Month
			</StyledMenuItem>
			<StyledMenuItem
				key={EazyfieldType.weekday}
				icon={<InteractionOutlined />}
			>
				Day of week
			</StyledMenuItem>
			<StyledMenuItem key={EazyfieldType.time} icon={<InteractionOutlined />}>
				Time
			</StyledMenuItem>
		</Menu>
		// </>
	);
});

export default MainMenu;

// export const FormSettings = observer(() => {
// 	log.debug(
// 		"FormSettings.render, activeSettings:",
// 		editorViewModel.activeSettings.label
// 	);

// 	const activeSettings = editorViewModel.activeSettings;
// 	const activeFieldId = editorViewModel.activeFieldId;
// 	let settingsView = null;

// 	switch (activeSettings.path) {
// 		case SettingsType.fields.path:
// 			if (activeFieldId.length > 0) {
// 				settingsView = <FieldSettingsFactory />;
// 			} else {
// 				settingsView = <FieldSettingsList />;
// 			}
// 			break;
// 		case SettingsType.availableFields.path:
// 			settingsView = <AvailableFields />;
// 			break;
// 		case SettingsType.direction.path:
// 			settingsView = <DirectionSetting />;
// 			break;
// 		case SettingsType.logo.path:
// 			settingsView = <LogoSettings />;
// 			break;
// 		case SettingsType.title.path:
// 			settingsView = <TitleSettings />;
// 			break;
// 		case SettingsType.description.path:
// 			settingsView = <DescriptionSettings />;
// 			break;
// 		case SettingsType.labelPosition.path:
// 			settingsView = <LabelPositionSetting />;
// 			break;
// 		case SettingsType.colors.path:
// 			settingsView = <ColorSettings />;
// 			break;
// 		case SettingsType.submitButton.path:
// 			settingsView = <SubmitButtonSettings />;
// 			break;
// 		case SettingsType.thankYouPage.path:
// 			settingsView = <ThankYouPageSettings />;
// 			break;
// 		case SettingsType.home.path:
// 			settingsView = <MainMenu />;
// 			break;
// 	}

// 	return (
// 		<>
// 			<Breadcrumbs />
// 			<StyledSettingsContainer>{settingsView}</StyledSettingsContainer>
// 		</>
// 	);
// });
