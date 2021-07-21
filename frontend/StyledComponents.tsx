import loglevel from "loglevel";
const log = loglevel.getLogger("StyledComponents");
log.setLevel("info");

import styled, { css } from "styled-components";

import { Form, Layout, Menu, Divider, Button, Typography, Select } from "antd";
const { Sider, Content } = Layout;

import { Tablet } from "./viewport";
export { Mobile, Tablet, Desktop } from "./viewport";

// export const withProps = <U,>() => <P, T, O>(
//   fn: ThemedStyledFunction<P, T, O>
// ): ThemedStyledFunction<P & U, T, O & U> => fn;

export const scrollbableStyle = css`
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 12px;
		height: 12px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	&::-webkit-scrollbar-button {
		display: none;
		height: 0;
		width: 0;
	}

	&::-webkit-scrollbar-thumb {
		background-color: hsla(0, 0%, 0%, 0.35);
		background-clip: padding-box;
		border: 3px solid rgba(0, 0, 0, 0);
		border-radius: 6px;
		min-height: 36px;
	}
`;

interface Props {
	backgroundcolor?: string;
	bordercolor?: string;
	textcolor?: string;
	justified?: string;
	width?: any;
	isDragging?: boolean;
	isDraggingOther?: boolean;
}

export const StyledFormLayout = styled(Layout)`
	${scrollbableStyle}
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
`;

export const StyledFormContent = styled(Content)`
	width: 100%;
	max-width: 400px;
	padding: 12px;
	/* padding-top: 32px;
	padding-bottom: 32px;
	padding-left: 12px;
	padding-right: 12px; */
`;

/* background-color: ${(props: Props) => props.backgroundcolor};
	border-color: ${(props) => props.bordercolor};
	color: ${(props) => props.textcolor}; */

/* background-color: ${(props) => props.backgroundcolor};
		border-color: ${(props) => props.bordercolor}; */
export const StyledPrimaryButton = styled(Button)`
	&&:hover {
		opacity: 0.8;
	}
`;

export const StyledSubmitButton = styled(StyledPrimaryButton)`
	margin-bottom: 8px;
	${(props) => (props.justified ? "width: 100%;" : null)}

	&&:hover {
		opacity: 0.8;
	}
`;

export const StyledDivider = styled(Divider)`
	&& {
		margin-top: 8px;
		margin-bottom: 8px;
		/* font-weight: unset; */
		font-size: 14px;
	}
`;

export const StyledLink = styled.a`
	opacity: 1;

	&:active,
	&:focus {
		box-shadow: none;
	}

	&:hover {
		opacity: 0.75;
	}
`;

export const StyledLogoWrapper = styled(StyledLink)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const StyledLogoText = styled(Typography.Text)`
	font-family: "Montserrat", -apple-system, system-ui, BlinkMacSystemFont,
		"Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
		sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

	font-size: 14px;
	margin-left: 6px;
`;

export const StyledInnerLayout = styled(Layout)`
	position: fixed;
	top: 34px;
	bottom: 26px;
	/* height: calc(100vh - 60px); */
	width: 100%;
	background-color: white;
`;

export const StyledSider = styled(Sider)`
	${scrollbableStyle}
	box-shadow: rgba(0, 0, 0, 0.1) 2px 0 0 0;
`;

export const StyledContent = styled(Content)`
	${scrollbableStyle}
	padding: 12px;
`;

export const StyledMenu = styled(Menu)`
	&& {
		width: calc(100% - 2px);
		border: none;
	}
`;

export const StyledMenuItem = styled(Menu.Item)`
	&& {
		height: 30px;
		line-height: 30px;
		color: rgba(0, 0, 0, 0.65);
		padding-left: 12px !important;
		/* padding-right: 0 !important; */
	}

	&& a {
		color: rgba(0, 0, 0, 0.65);
	}

	&&:hover,
	&&:hover a {
		color: rgb(24, 144, 255);
	}
`;

export const StyledFormItemContainer = styled.div`
	width: ${(props: Props) => props.width};
	position: relative;
	padding-left: 5px;
	padding-right: 5px;
	${(props) => {
		if (props.isDragging) {
			return `
				box-shadow: 0 0 0 2px #71d7f7; 
				&& .sb-form-field-editor {
				box-shadow: 0 0 0 2px #71d7f7; 
				display: flex; 
				flex-direction: row; 
				align-items: top; 
				justify-content: space-between;
			}
			&& .dragHandle {
				display: inherit;
			}
			&& .sb-toolbar {
				display: inherit;
			}`;
		} else {
			return null;
		}
	}};

	&:hover .sb-form-item-editor {
		z-index: 1;
		box-shadow: 0 0 0 2px #71d7f7;
		display: flex;
		flex-direction: row;
		align-items: top;
		justify-content: flex-end;
	}

	&:hover .sb-form-field-editor {
		justify-content: space-between;
	}

	&:hover .dragHandle {
		z-index: 2;
		display: inherit;
	}

	&:hover .sb-toolbar {
		z-index: 2;
		display: inherit;
	}

	/* So user can play with the controls otherwise, they are not reachable */
	&&:hover .ant-form-item-control,
	&&:hover input,
	&&:hover textarea,
	&&:hover .ant-select,
	&&:hover .ant-input-number,
	&&:hover .ant-rate {
		z-index: 3;
	}

	/* ${(props) => {
		if (props.isDraggingOther) {
			return `
			&& .sb-form-item-editor {
				display: none;
				box-shadow: none;
			}
			&& .dragHandle {
				display: none;
			}
			&& .sb-toolbar {
				display: none;
			}`;
		} else {
			return `
			`;
		}
	}}; */
`;

export const StyledFormItemEditor = styled.div`
	display: hidden;
	position: absolute;
	top: -28px;
	bottom: 0;
	left: 0;
	right: 0;
`;

export interface StyledFormItemProps {
	explaincolor?: string;
}

// import { colorUtils, colors } from "@airtable/blocks/ui";
// const green = colorUtils.getHexForColor(colors.GREEN);

export const StyledFormItem = styled(Form.Item)<StyledFormItemProps>`
	/* margin-bottom: 8px; */

	button {
		background-color: rgb(45, 127, 249);
		color: white;
	}

	&& button:disabled {
		background-color: rgb(45, 127, 249);
		color: white;
		opacity: 0.5;
	}

	&& button::hover {
		background-color: rgb(45, 127, 249);
		color: white;
		opacity: 0.75;
	}

	button, input, .ant-select {
		border-radius: 3px;
	}

	&& label:after {
		display: inherit;
	}

  &&.ant-form-item-has-success .ant-form-item-explain {
		color: #11af22;
  }

	/* .ant-form-item-label {
		text-align: left;
	}

	.ant-form-item-control-input-content {
		display: flex;
		justify-content: flex-end;
	}

	@media (max-width: ${Tablet.maxWidthPx}) {
		.ant-col-xs-24 .ant-form-item-control-input-content {
			justify-content: flex-start;
		}
	} */
`;

// export const StyledPanel = styled(Panel)`
// 	.ant-collapse-header {
// 		padding-top: 6px !important;
// 		padding-right: 6px !important;
// 	}
// `;

// Use className="ef-toolbar" to show it on hover of container element
export const StyledFormItemToolbar = styled.div`
	display: none;

	.ant-btn {
		color: white;
		background-color: #10bcf2;
		background-image: linear-gradient(0deg, #41c9f4, #71d7f7);
		border: none;
		border-radius: 0;
	}

	&& .ant-btn:hover,
	&& .ant-btn:active {
		color: white;
		background-color: #10bcf2;
		background-image: none;
	}
`;

export const StyledSelect = styled(Select)`
	.ant-select-selection-placeholder {
		color: rgba(0, 0, 0, 0.65);
		opacity: unset;
	}
`;
