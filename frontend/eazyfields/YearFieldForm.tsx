import loglevel from "loglevel";
const log = loglevel.getLogger("YearFieldForm");
// log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import BoundInputNumber from "../components/BoundInputNumber";
import EazyfieldForm from "./EazyfieldForm";
import YearField from "../models/YearField";
import { Rule } from "antd/lib/form";

const YearFieldForm = observer(({ field }: { field: YearField }) => {
	log.debug(
		"YearFieldForm.render, firstYear:",
		field.firstYear,
		", lastYear:",
		field.lastYear
	);
	// We need to access firstYear and lastYear so mobx knows to call this component whenever they change

	// TODO: Move to view model
	const firstYearRules: Rule[] = [
		{
			required: true,
			message: "Please enter the first year",
		},
	];

	const lastYearRules: Rule[] = [
		{
			required: true,
			message: "Please enter the last year",
		},
	];

	const extraLastYearProps: any = {};

	if (typeof field.firstYear == "number" && typeof field.lastYear == "number") {
		if (field.firstYear >= field.lastYear) {
			extraLastYearProps.validateStatus = "error";
			extraLastYearProps.help = "Last year needs to be bigger than first";
		}
	}

	return (
		<EazyfieldForm
			field={field}
			formValues={field.yearFieldFormValues}
			previewValue={
				typeof field.firstYear == "number" ? field.firstYear : undefined
			}
			previewPlaceholder="No valid year range"
			hideLanguageSelection={true}
		>
			<BoundInputNumber
				name="firstYear"
				value={field.firstYear}
				rules={firstYearRules}
				label="First year in selection range"
				model={field}
				prop="firstYear"
			/>
			<BoundInputNumber
				name="lastYear"
				value={field.lastYear}
				rules={lastYearRules}
				label="Last year in selection range"
				model={field}
				prop="lastYear"
				{...extraLastYearProps}
			/>
		</EazyfieldForm>
	);
});

export default YearFieldForm;
