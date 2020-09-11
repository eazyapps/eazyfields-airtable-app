import loglevel from "loglevel";
const log = loglevel.getLogger("BoundTimePicker");
log.setLevel("info");

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
		style,
		name,
		value,
		rules,
		model,
		prop,
		label,
		layout,
		validateStatus,
		help,
	}: BoundTimePickerProps) => {
		log.debug(
			"BoundTimePicker.render, value:",
			typeof value != "string" ? value.format("HH:mm") : ""
		);

		const onChange = (time: Moment, timeString: string) => {
			log.debug(
				"BoundTimePicker.onChange, time:",
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
				style={style}
				// name={name}
				// rules={rules}
				label={label}
				colon={false}
				{...extraProps}
				{...layout}
			>
				<TimePicker
					style={{ width: "100%" }}
					format="HH:mm"
					value={value}
					onChange={onChange}
					allowClear={false}
				/>
			</StyledFormItem>
		);
	}
);

export default BoundTimePicker;
