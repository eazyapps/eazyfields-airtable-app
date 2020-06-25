import loglevel from "loglevel";
const log = loglevel.getLogger("SuperfieldForm");
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
import Superfield from "../models/Superfield";

const SuperfieldForm = observer(
	({
		field,
		formValues,
		previewValue,
		previewPlaceholder,
		children,
		hideLanguageSelection,
	}: {
		field: Superfield;
		formValues: any;
		previewValue?: string | number;
		previewPlaceholder?: string;
		children?: any;
		hideLanguageSelection?: boolean;
	}) => {
		log.debug("SuperfieldForm.render");

		const [form] = Form.useForm();

		const [error, setError] = useState(null);

		if (error) {
			throw error;
		}

		form.setFieldsValue(formValues);

		const onFinish = (values) => {
			try {
				log.debug("SuperfieldForm.onFinish, values:", values);
				field.create(values);
			} catch (e) {
				log.error("SuperfieldForm.onFinish, error:", e);
				setError(e);
			}
		};

		const onFinishFailed = (errorInfo) => {
			log.debug("SuperfieldForm.onFinishFailed, errorInfo:", errorInfo);
		};

		const onValuesChange = (changedValues, allValues) => {
			log.debug("SuperfieldForm.onValuesChange, changedValues:", changedValues);
			field.onValuesChange(changedValues, allValues);
		};

		const validateUniqueName = (rule, value) => {
			log.debug("SuperfieldForm.validateUniqueName, value:", value);
			if (!value || !field.table) {
				return Promise.resolve();
			}
			const existingField = field.table.getFieldByNameIfExists(value);
			if (existingField) {
				return Promise.reject(`The ${value} field already exists`);
			}
			return Promise.resolve();
		};

		return (
			<Form
				form={form}
				layout="vertical"
				onValuesChange={onValuesChange}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<TableSelector field={field} />
				<BoundInput
					name="name"
					rules={[
						{
							required: true,
							message: "Please enter a field name",
						},
						{
							validator: validateUniqueName,
						},
					]}
					label="Unique name for field"
					model={field}
					prop="name"
				/>
				{hideLanguageSelection !== true ? (
					<BoundSelect
						name="language"
						rules={[{ required: true, message: "Please select a language" }]}
						label="Language for field values"
						model={field}
						prop="language"
						options={languagePackStore.supportedLanguages}
					/>
				) : null}
				{children}
				<StyledFormItem label="Preview of field values">
					{field.options.length > 0 ? (
						<Select defaultValue={field.options[0].value} value={previewValue}>
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
						disabled={field.options.length == 0 ? true : undefined}
					>
						Create field
					</StyledSubmitButton>
				</StyledFormItem>
			</Form>
		);
	}
);

export default SuperfieldForm;
