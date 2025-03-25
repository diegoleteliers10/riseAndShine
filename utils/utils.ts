export function combineDateTime(date: string, time: string): string {
    if (!date || !time) {
        return '';
    }

    try {
        // Tomar la fecha seleccionada
        const dateObj = new Date(date);
        
        // Separar la hora en horas y minutos
        const [hours, minutes] = time.split(':').map(Number);
        
        // Crear nueva fecha con la hora exacta seleccionada
        const combinedDate = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            hours,
            minutes,
            0
        );

        // Retornar en formato ISO
        return combinedDate.toISOString();

    } catch (error) {
        console.error('Error al combinar fecha y hora:', error);
        return '';
    }
}