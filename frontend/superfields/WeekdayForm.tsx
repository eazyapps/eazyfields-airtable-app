import loglevel from "loglevel";
const log = loglevel.getLogger("Country");
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import { Form, Select } from "antd";
const { Option } = Select;

import { StyledFormItem, StyledSubmitButton } from "../StyledComponents";

import BoundSelect from "../components/BoundSelect";
import SuperfieldForm from "./SuperfieldForm";
import CalendarField from "../models/WeekdayField";

const CalendarFieldForm = observer(({ field }: { field: CalendarField }) => {
	log.debug("CalendarFieldForm.render");

	const widthOptions = field.widthOptions;

	return (
		<SuperfieldForm field={field} formValues={field.calendarFieldFormValues}>
			<BoundSelect
				name="width"
				rules={[{ required: true, message: "Please select a format" }]}
				label="Format of field values"
				model={field}
				prop="width"
				options={widthOptions}
				defaultValue={widthOptions.length ? widthOptions[0].value : null}
				placeholder="Loading options in selected language"
			/>
		</SuperfieldForm>
	);
});

export default CalendarFieldForm;
