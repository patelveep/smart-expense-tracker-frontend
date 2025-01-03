export function formatCurrency(value: string | number): string {
    let numberValue: number;

    if (typeof value === 'string') {
        numberValue = parseFloat(value);
        if (isNaN(numberValue)) {
            throw new Error('Invalid input: unable to convert string to number');
        }
    } else {
        numberValue = value;
    }

    return numberValue.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}