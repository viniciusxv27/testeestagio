import { useEffect, useState } from 'react'
import Papa from 'papaparse'

import { Agencia } from '../interfaces/Agencia'

export default function useAgencia(codigo: number) {
    const [agencia, setAgencia] = useState<Agencia[]>()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias')
            const csvText = await response.text()

            const parsedData = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            })

            const filteredData = parsedData.data.filter((item: any) => item.codigo === codigo)

            setAgencia(filteredData as Agencia[])
        }

        if (codigo) {
            fetchData()
        }
    }, [codigo])

    if (!agencia) {
        return { agencia: null }
    } else {
        return { agencia: agencia[0] }
    }

}
