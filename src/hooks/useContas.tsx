import { useEffect, useState } from 'react'
import Papa from 'papaparse'

import { Conta } from '../interfaces/Conta'

export default function useContas(cpfCnpj: string) {
    const [contas, setContas] = useState<Conta[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas')
            const csvText = await response.text()

            const parsedData = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            })

            const filteredData = parsedData.data.filter((item: any) => item.cpfCnpjCliente === cpfCnpj)

            setContas(filteredData as Conta[])
        }

        if (cpfCnpj) {
            fetchData()
        }
    }, [cpfCnpj])

    return { contas }
}
