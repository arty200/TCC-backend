module.exports = {
    pacienteWithChildren: `
        WITH RECURSIVE subpacientes (id) AS (
            SELECT id FROM pacientes WHERE id = ?
            UNION ALL
            SELECT c.id FROM subpacientes, pacientes c
            WHERE id = 1
        )
        SELECT id FROM subpacientes
    `
}

//
//                