
export const padLeftTwoDigits = (numberToPad) => {
    const base = '00' + numberToPad;
    return base.substr(base.length - 2);
};

const currencyFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

export const formatCurrency = (value) => currencyFormatter.format(value);
