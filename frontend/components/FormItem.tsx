export interface ColLayout {
	span: number;
	offset?: number;
}

export interface FormItemLayout {
	labelCol: ColLayout;
	wrapperCol: ColLayout;
}

export default class FormItem {
	static getLayoutProps(labelSpan: number): FormItemLayout {
		const wrapperSpan = labelSpan === 24 ? 24 : 24 - labelSpan;

		return {
			labelCol: { span: labelSpan },
			wrapperCol: { span: wrapperSpan },
		};
	}
}
