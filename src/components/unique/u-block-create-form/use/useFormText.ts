import CTextarea from '@/components/common/c-textarea';

import { useForm } from '@/use/form';
import { useValidators } from '@/use/validators';

function useFormText() {
	const {
		required,
		cssWeight,
		cssFontSize,
		cssColor,
	} = useValidators();

	const {
		valid,
		reset,
		formFields
	} = useForm({
		text: {
			placeholder: 'Text',
			component: CTextarea,
			validators: {
				required,
			},
		},
		subtext: {
			placeholder: 'Subtext',
		},
		title: {
			placeholder: 'Title',
		},
		fontWeight: {
			placeholder: 'Font weight',
			validators: {
				cssWeight,
			},
		},
		fontSize: {
			placeholder: 'Font size',
			validators: {
				cssFontSize,
			},
		},
		color: {
			placeholder: 'Color',
			validators: {
				cssColor,
			},
		},
	});

	return {
		isFormFieldsTextValid: valid,
		formFieldsText: formFields,
		resetFormFieldsText: reset,
	}
}

export default useFormText
