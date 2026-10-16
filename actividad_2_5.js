// Lote de transacciones que llega de la API + DOS transicciones extras
let transacciones = ["100.50", "200.00", "ERROR_RECHAZADO", "TEXTO_INVALIDO", "150.75", "50.25", "9999.99", "10.00"]; let saldoTotal = 0;

console.log("Iniciando auditoría de transacciones...");

// Corregir el desbordamiento cambiando '<=' por '<'
for (let i = 0; i < transacciones.length; i++) {
    let transaccion = transacciones[i];

    // Controlar valores corruptos específicos
    if (transaccion === "ERROR_RECHAZADO") {
        console.log("Transacción corrupta saltada.");
        continue; // Salta a la siguiente iteración
    }

    // Convertir a número y validar si es un número válido
    let valorNumerico = parseFloat(transaccion);

    // Filtrar transacciones que no sean números y no acumularlas
    if (isNaN(valorNumerico)) {
        console.log("Transacción no numérica detectada ('" + transaccion + "'). Ignorando.");
        continue;
    }

    // Detener operaciones sospechosas (Alerta de fraude si supera 5000)
    if (valorNumerico > 5000) {
        console.log("¡Alerta de Fraude detectada! Cancelando proceso.");
        break; // Abandona el bucle inmediatamente
    }

    // Coerción de tipos oculta resuelta sumando el valor numérico
    saldoTotal += valorNumerico;
}

console.log("Saldo total auditado: " + saldoTotal);