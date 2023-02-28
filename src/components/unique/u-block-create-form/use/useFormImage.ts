import { useForm } from '@/use/form';
import { useValidators } from '@/use/validators';

function useFormImage() {
	const {
		required,
		url,
		cssWidthOrHeight,
	} = useValidators();

	const {
		valid,
		formFields,
		reset
	} = useForm({
		url: {
			placeholder: 'Url',
			validators: {
				required,
				url,
			},
		},
		subtext: {
			placeholder: 'Subtext',
		},
		title: {
			placeholder: 'Title',
		},
		alt: {
			placeholder: 'Alt',
		},
		width: {
			placeholder: 'Width',
			validators: {
				cssWidthOrHeight,
			},
		},
		height: {
			placeholder: 'Height',
			validators: {
				cssWidthOrHeight,
			},
		},
	});

	return {
		isFormFieldsImageValid: valid,
		formFieldsImage: formFields,
		resetFormFieldsImage: reset,
	}
}

export default useFormImage
