export function combineDateTime(date: string, time: string): string {
    // Validar que tengamos tanto fecha como hora
    if (!date || !time) {
        console.log('Fecha o hora faltante:', { date, time });
        return '';
    }

    try {
        // Crear fecha base
        const dateObj = new Date(date);
        
        // Separar la hora en horas y minutos
        const [hours, minutes] = time.split(':').map(Number);
        
        if (isNaN(hours) || isNaN(minutes)) {
            console.log('Hora inválida:', time);
            return '';
        }

        // Crear fecha combinada manteniendo la zona horaria local
        const combinedDate = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            hours,
            minutes,
            0
        );

        // Convertir a UTC para almacenamiento
        const utcDate = new Date(Date.UTC(
            combinedDate.getFullYear(),
            combinedDate.getMonth(),
            combinedDate.getDate(),
            hours,
            minutes,
            0
        ));

        return utcDate.toISOString();
    } catch (error) {
        console.error('Error al combinar fecha y hora:', error);
        return '';
    }
}