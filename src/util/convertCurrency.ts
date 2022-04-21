export const numberToCurrency = (value: number | undefined) => {
	if (value !== undefined) {
		return value.toLocaleString('pt-br', {
			style: 'currency',
			currency: 'BRL',
		});
	}
	return "0";
}

export const currencyToNumber = (value: string | undefined) => {
	if (value !== undefined) {
		value = value.replace("R$", '')
			.replace(",", '')
			.replace(".", '')
			.trim();

		return format(value);
	}
	return 0;
}

export const format = (value: string) => {
	if (value.length === 1)
		value = `000${value}`;

	return Number(
		`${value.substr(0, value.length - 2)}.${value.substr(value.length - 2, value.length)}`,
	);
}

export const convertCurrency = (value: string) => {
	const validValue = value === '' || value === undefined ? 0 : value;

	if (validValue === 0) {
		return validValue.toLocaleString('pt-br', {
			style: 'currency',
			currency: 'BRL',
		});
	}

	const result: string = validValue
		.replace('R$', '')
		.replace(',', '')
		.replace('.', '');

	const formated = format(result);

	if (isNaN(formated) || formated >= 1000000) {
		return (0).toLocaleString('pt-br', {
			style: 'currency',
			currency: 'BRL',
		});
	}

	return formated.toLocaleString('pt-br', {
		style: 'currency',
		currency: 'BRL',
	});
}
