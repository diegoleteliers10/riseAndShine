export function combineDateTime(date: string, time: string): string {
    // Validar que tengamos tanto fecha como hora
    if (!date || !time) {
        console.log('Fecha o hora faltante:', { date, time });
        return '';
    }

    try {
        // Crear fecha base en la zona horaria local
        const dateObj = new Date(date);
        
        // Separar la hora en horas y minutos
        const [hours, minutes] = time.split(':').map(Number);
        
        if (isNaN(hours) || isNaN(minutes)) {
            console.log('Hora inválida:', time);
            return '';
        }

        // Crear nueva fecha con la hora en la zona horaria local
        const combinedDate = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            hours,
            minutes,
            0
        );

        // Ajustar la fecha para la zona horaria UTC
        const userTimezoneOffset = combinedDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(combinedDate.getTime() - userTimezoneOffset);

        return adjustedDate.toISOString();
    } catch (error) {
        console.error('Error al combinar fecha y hora:', error);
        return '';
    }
}