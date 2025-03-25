export function combineDateTime(date: string, time: string): string {
    // Validar que tengamos tanto fecha como hora
    if (!date || !time) {
        console.log('Fecha o hora faltante:', { date, time });
        return '';
    }

    try {
        // Asegurarnos de que la fecha esté en formato YYYY-MM-DD
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            console.log('Fecha inválida:', date);
            return '';
        }

        // Separar la hora en horas y minutos
        const [hours, minutes] = time.split(':').map(Number);
        
        // Validar que las horas y minutos sean números válidos
        if (isNaN(hours) || isNaN(minutes)) {
            console.log('Hora inválida:', time);
            return '';
        }

        // Crear nueva fecha con la hora
        const combinedDate = new Date(dateObj);
        combinedDate.setHours(hours, minutes, 0);

        // Retornar en formato ISO
        return combinedDate.toISOString();
    } catch (error) {
        console.error('Error al combinar fecha y hora:', error);
        return '';
    }
}