import React from 'react';

const ValidationInput: React.FC<ValidationInputProps> = ({
	id,
	name,
	type,
	value,
	onChange,
	placeholder = '',
	label,
	errors,
	required = false
}) => {
	return (
		<div className='form-group'>
			<label htmlFor={id}>
				{label} {required && '*'}
			</label>
			<input
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				className={errors.length > 0 ? 'error' : ''}
				placeholder={placeholder}
			/>
			{errors.map((error: string, index: number) => (
				<span key={index} className='error-message'>{error}</span>
			))}
		</div>
	);
};

export default ValidationInput;
