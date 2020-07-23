import loglevel from "loglevel";
const log = loglevel.getLogger("BoundTimePicker");
// log.setLevel("debug");

import { Moment } from "moment";

import React from "react";

import { TimePicker } from "antd";

import { observer } from "mobx-react-lite";

import { BoundComponentProps } from "./BoundComponent";
import { StyledFormItem } from "../StyledComponents";

export interface BoundTimePickerProps extends BoundComponentProps {
	value: Moment;
}

const BoundTimePicker = observer(
	({
		name,
		value,
		rules,
		model,
		prop,
		label,
		layout,
		placeholder,
		validateStatus,
		help,
	}: BoundTimePickerProps) => {
		log.debug(
			"BoundTimePicker.render, value:",
			typeof value != "string" ? value.format("HH:mm") : ""
		);

		const handleChange = (time: Moment, timeString: string) => {
			log.debug(
				"BoundTimePicker.handleChange, time:",
				time.format("HH:mm"),
				", timeString:",
				timeString
			);
			model[prop] = time;
		};

		const extraProps: any = {};
		if (validateStatus) {
			extraProps.validateStatus = validateStatus;
			extraProps.help = help;
		}

		return (
			<StyledFormItem
				name={name}
				rules={rules}
				label={label}
				{...extraProps}
				{...layout}
			>
				<TimePicker format="HH:mm" onChange={handleChange} allowClear={false} />
			</StyledFormItem>
		);
	}
);

export default BoundTimePicker;
