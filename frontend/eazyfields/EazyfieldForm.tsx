import loglevel from "loglevel";
const log = loglevel.getLogger("EazyfieldForm");
log.setLevel("debug");

import React, { useState } from "react";

import { observer } from "mobx-react-lite";

import { Form, Select } from "antd";
const { Option } = Select;

import { StyledFormItem, StyledSubmitButton } from "../StyledComponents";

import BoundSelect from "../components/BoundSelect";
import TableSelector from "../components/TableSelector";
import BoundInput from "../components/BoundInput";
import languagePackStore from "../models/LanguagePackStore";
import Eazyfield from "../models/Eazyfield";

const EazyfieldForm = observer(
	({
		field,
		formValues,
		disableSubmits,
		previewPlaceholder,
		children,
		hideLanguageSelection,
	}: {
		field: Eazyfield;
		formValues?: any;
		disableSubmits?: boolean;
		previewValue?: string | number;
		previewPlaceholder?: string;
		children?: any;
		hideLanguageSelection?: boolean;
	}) => {
		log.debug("EazyfieldForm.render");

		const [form] = Form.useForm();

		const [error, setError] = useState(null);

		if (error) {
			throw error;
		}

		// form.setFieldsValue(formValues);

		const onSubmit = async () => {
			try {
				log.debug("EazyfieldForm.onSubmit");
				await field.create();
			} catch (e) {
				log.error("EazyfieldForm.onFinish, error:", e);
				setError(e);
			}
		};

		// const onFinish = (values) => {
		// 	try {
		// 		log.debug("EazyfieldForm.onFinish, values:", values);
		// 		field.create();
		// 	} catch (e) {
		// 		log.error("EazyfieldForm.onFinish, error:", e);
		// 		setError(e);
		// 	}
		// };

		// const onFinishFailed = (errorInfo) => {
		// 	log.debug("EazyfieldForm.onFinishFailed, errorInfo:", errorInfo);
		// };

		const onValuesChange = (changedValues, allValues) => {
			log.debug("EazyfieldForm.onValuesChange, changedValues:", changedValues);
			field.onValuesChange(changedValues, allValues);
		};

		// const validateUniqueName = (rule, value) => {
		// 	log.debug("EazyfieldForm.validateUniqueName, value:", value);
		// 	if (!value || !field.table) {
		// 		return Promise.resolve();
		// 	}
		// 	const existingField = field.table.getFieldByNameIfExists(value);
		// 	if (existingField) {
		// 		return Promise.reject(`The ${value} field already exists`);
		// 	}
		// 	return Promise.resolve();
		// };

		const filterLanguageOption = (
			inputValue: string,
			option: { name: string }
		) => {
			// log.debug("EazyfieldForm.filterLanguageOption, option:", option);
			return option.name.toLowerCase().startsWith(inputValue.toLowerCase());
		};

		// <Form
		// 	form={form}
		// 	layout="vertical"
		// 	onValuesChange={onValuesChange}
		// 	// onFinish={onFinish}
		// 	// onFinishFailed={onFinishFailed}
		// >
		return (
			<>
				<TableSelector field={field} />
				<BoundInput
					name="name"
					label="Unique name for field"
					model={field}
					prop="name"
					rules={field.nameRules}
					validateStatus={field.fieldNameStatus}
					help={field.fieldNameStatusMessage}
				/>
				{hideLanguageSelection !== true ? (
					<BoundSelect
						name="language"
						rules={[{ required: true, message: "Please select a language" }]}
						label="Language for field values"
						model={field}
						prop="language"
						showSearch={true}
						filterOption={filterLanguageOption}
						options={languagePackStore.supportedLanguages}
					/>
				) : null}
				{children}
				<StyledFormItem
					label="Preview of field values"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					{field.options.length > 0 ? (
						<Select value={field.options[0].value}>
							{field.options.map((option) => (
								<Option key={option.value} value={option.value}>
									{option.name}
								</Option>
							))}
						</Select>
					) : (
						<Select
							placeholder={
								previewPlaceholder != null
									? previewPlaceholder
									: "Loading values in selected language"
							}
						/>
					)}
				</StyledFormItem>
				<StyledFormItem
					validateStatus={field.submitStatus}
					help={field.submitStatusMessage}
				>
					<StyledSubmitButton
						id="submit"
						type="primary"
						htmlType="submit"
						loading={field.isCreating}
						justified="true"
						onClick={onSubmit}
						// disabled={field.disableCreateButton}
						disabled={
							disableSubmits != null
								? disableSubmits
								: field.disableCreateButton
						}
						// style={
						// 	field.disableCreateButton
						// 		? undefined
						// 		: { backgroundColor: blueBright }
						// }
					>
						Create field
					</StyledSubmitButton>
				</StyledFormItem>
			</>
		);
	}
	//			</Form>
);

export default EazyfieldForm;
