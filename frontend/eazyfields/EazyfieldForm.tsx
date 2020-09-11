import loglevel from "loglevel";
const log = loglevel.getLogger("EazyfieldForm");
log.setLevel("info");

import React, { useState } from "react";

import { observer } from "mobx-react-lite";

import { Select } from "antd";
const { Option } = Select;

import FormItem from "../components/FormItem";

import { StyledFormItem, StyledSubmitButton } from "../StyledComponents";

import BoundSelect from "../components/BoundSelect";
import TableSelector from "../components/TableSelector";
import BoundInput from "../components/BoundInput";
import languagePackStore from "../models/LanguagePackStore";
import Eazyfield from "../models/Eazyfield";

const EazyfieldForm = observer(
	({
		field,
		disableSubmits,
		previewPlaceholder,
		children,
		hideLanguageSelection,
	}: {
		field: Eazyfield;
		disableSubmits?: boolean;
		previewValue?: string | number;
		previewPlaceholder?: string;
		children?: any;
		hideLanguageSelection?: boolean;
	}) => {
		log.debug("EazyfieldForm.render");

		const [error, setError] = useState(null);

		// throw new Error("I'm an error");

		if (error) {
			throw error;
		}

		const onSubmit = async () => {
			try {
				log.debug("EazyfieldForm.onSubmit");
				await field.create();
			} catch (e) {
				log.error("EazyfieldForm.onFinish, error:", e);
				setError(e);
			}
		};

		const filterLanguageOption = (
			inputValue: string,
			option: { name: string }
		) => {
			log.debug(
				"EazyfieldForm.filterLanguageOption, option:",
				option,
				", inputValue:",
				inputValue
			);
			return option.name.toLowerCase().startsWith(inputValue.toLowerCase());
		};

		return (
			<>
				<TableSelector field={field} />
				<BoundInput
					name="name"
					label="Unique name for single select field:"
					model={field}
					prop="name"
					rules={field.nameRules}
					validateStatus={field.fieldNameStatus}
					help={field.fieldNameStatusMessage}
					layout={FormItem.getLayoutProps(24)}
				/>
				{hideLanguageSelection !== true ? (
					<BoundSelect
						name="language"
						rules={[{ required: true, message: "Please select a language" }]}
						label="Language for field values:"
						model={field}
						prop="language"
						showSearch={true}
						filterOption={filterLanguageOption}
						options={languagePackStore.supportedLanguages}
						layout={FormItem.getLayoutProps(24)}
					/>
				) : null}
				{children}
				<StyledFormItem
					label="Preview of field options:"
					colon={false}
					{...FormItem.getLayoutProps(24)}
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
);

export default EazyfieldForm;
