import loglevel from "loglevel";
const log = loglevel.getLogger("TimeFieldForm");
// log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import BoundTimePicker from "../components/BoundTimePicker";
import EazyfieldForm from "./EazyfieldForm";
import TimeField from "../models/TimeField";
import BoundInputNumber from "../components/BoundInputNumber";
import FormItem from "../components/FormItem";

const TimeFieldForm = observer(({ field }: { field: TimeField }) => {
	// We need to access the fields so mobx knows to call this component whenever they change
	log.debug(
		"TimeFieldForm.render, startTime:",
		field.startTime.format("HH:mm"),
		", endTime:",
		field.endTime.format("HH:mm"),
		", gap:",
		field.gap
	);

	const additionalEndTimeProps: any = {};

	if (field.startTime.isSameOrAfter(field.endTime)) {
		additionalEndTimeProps.validateStatus = "error";
		additionalEndTimeProps.help = "Start time needs to be after end time";
	}

	return (
		<EazyfieldForm
			field={field}
			previewValue={
				field.options.length > 0 ? field.options[0].value : undefined
			}
			previewPlaceholder="Please fix problems"
			hideLanguageSelection={true}
		>
			<BoundTimePicker
				style={{
					display: "inline-block",
					width: "50%",
					paddingRight: "6px",
				}}
				name="startTime"
				value={field.startTime}
				rules={[
					{
						required: true,
						message: "Please enter start time",
					},
				]}
				label="Start time:"
				model={field}
				prop="startTime"
			/>
			<BoundTimePicker
				style={{
					display: "inline-block",
					width: "50%",
					paddingLeft: "6px",
				}}
				name="endTime"
				value={field.endTime}
				rules={[
					{
						required: true,
						message: "Please enter end time",
					},
				]}
				label="End time:"
				model={field}
				prop="endTime"
				{...additionalEndTimeProps}
			/>
			<BoundInputNumber
				name="gap"
				value={field.gap}
				rules={[
					{
						required: true,
						message: "Please enter gap",
					},
				]}
				label="Gap between values, in minutes:"
				model={field}
				prop="gap"
				layout={FormItem.getLayoutProps(24)}
			/>
		</EazyfieldForm>
	);
});

export default TimeFieldForm;
