import {getInputClasses, uniqueId} from '../utils';
import {FormError, InputProps, TypeFormField, FormField} from './Form';

interface TypeFileInput extends InputProps {
	highlightValid?: boolean;
	errorMessage?: string;
	accept?: string;
	capture?: boolean | 'user' | 'environment';
	multiple?: boolean;
	ref?: any /* Look up correct type */;
}
export interface FileInputProps extends TypeFileInput, TypeFormField {}
interface PrivateFileInputProps extends TypeFileInput {
	id: string;
}

function PrivateFileInput({
	id,
	name,
	ref,
	highlightValid,
	errorMessage,
	required,
	disabled,
	accept,
	capture,
	multiple,
}: PrivateFileInputProps) {
	return (
		<span
			className={getInputClasses({
				highlightValid,
				errorMessage,
				inputType: 'file',
			})}>
			<input
				id={id}
				type="file"
				name={name}
				ref={ref}
				required={required}
				disabled={disabled}
				accept={accept}
				capture={capture}
				multiple={multiple}
			/>
			{errorMessage && <FormError errorMessage={errorMessage} />}
		</span>
	);
}

export function FileInput({
	title,
	description,
	isOptional,
	inlineField,
	isVerticalCenter,
	name,
	ref,
	highlightValid,
	errorMessage,
	required,
	disabled,
}: FileInputProps) {
	const id = uniqueId('labelledby_');
	const inputProps = {
		id,
		name,
		ref,
		highlightValid,
		errorMessage,
		required,
		disabled,
	};
	const fieldProps = {
		id,
		title,
		description,
		isOptional,
		inlineField,
		isVerticalCenter,
	};

	return (
		<FormField {...fieldProps}>
			<PrivateFileInput {...inputProps} />
		</FormField>
	);
}
