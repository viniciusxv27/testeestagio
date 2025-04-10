import { useEffect, useState } from 'react'
import Papa from 'papaparse'

import { Cliente } from '../interfaces/Cliente'

export default function useClients() {
    const [clients, setClients] = useState<Cliente[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes')
            const csvText = await response.text()

            const parsedData = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            })

            setClients(parsedData.data as Cliente[])
        }

        fetchData()
    }, [])

    return { clients }
}
