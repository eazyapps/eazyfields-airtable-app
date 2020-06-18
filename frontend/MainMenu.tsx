import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { DragOutlined, InteractionOutlined } from "@ant-design/icons";
import { StyledMenuItem } from "./StyledComponents";

import { observer } from "mobx-react-lite";

import viewModel, { SuperfieldType } from "./ViewModel";
import { Menu } from "antd";

const MainMenu = observer(() => {
	log.debug("MainMenu.render");

	const onSelect = ({ key }) => {
		log.debug("MainMenu.onSelect, key:", key);
		viewModel.activeSuperfieldType = key;
	};

	return (
		<Menu
			mode="inline"
			selectedKeys={[viewModel.activeSuperfieldType]}
			onSelect={onSelect}
		>
			<StyledMenuItem key={SuperfieldType.country} icon={<DragOutlined />}>
				Country
			</StyledMenuItem>
			<StyledMenuItem
				key={SuperfieldType.dayOfWeek}
				icon={<InteractionOutlined />}
			>
				Day of week
			</StyledMenuItem>
		</Menu>
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
