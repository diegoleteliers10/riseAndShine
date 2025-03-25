export function combineDateTime(date: string, time: string): string {
    if (!date || !time) {
        return '';
    }

    // Simplemente concatenar la fecha y la hora
    return `${date}T${time}:00.000Z`;
}