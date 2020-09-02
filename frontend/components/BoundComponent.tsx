import { Moment } from "moment";
import { ValidateStatus } from "../models/Eazyfield";

export interface ColLayout {
	span: number;
	offset?: number;
}

export interface FormItemLayout {
	labelCol: ColLayout;
	wrapperCol: ColLayout;
}

export interface ResponsiveColLayout {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	xxl: number;
}

export interface ResponsiveFormItemLayout {
	labelCol: ResponsiveColLayout;
	wrapperCol: ResponsiveColLayout;
}

export interface ResponsiveFormItemLayout {
	labelCol: ResponsiveColLayout;
	wrapperCol: ResponsiveColLayout;
}

export interface BoundComponentProps {
	style?: React.CSSProperties;
	name?: string;
	rules?: any;
	model: object;
	prop: string;
	label: string;
	placeholder?: string;
	defaultValue?: number | string;
	layout?: FormItemLayout | ResponsiveFormItemLayout;
	disabled?: boolean;
	onChange?: Function;
	value?: number | string | Moment;
	validateStatus?: ValidateStatus;
	help?: string;
}
