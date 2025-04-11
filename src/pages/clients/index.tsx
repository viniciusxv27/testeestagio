import { useState, useEffect } from 'react'
import ClientTable from '../../components/ClientTable'
import useClients from '../../hooks/useClients'
import { Cliente } from '../../interfaces/Cliente'
import './index.module.css'

const ITEMS_PER_PAGE = 10

export default function ClientsPage() {
    const { clients } = useClients()
    const [filteredClients, setFilteredClients] = useState<Cliente[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setFilteredClients(clients)
    }, [clients])

    const handleSearch = (value: string) => {
        const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        const filtered = clients.filter(client =>
            normalize(client.nome).toLowerCase().includes(normalize(value).toLowerCase()) ||
            client.cpfCnpj.includes(value)
        )
        setFilteredClients(filtered)
        setCurrentPage(1)
    }

    const handleFilter = (value: string) => {
        
        if( value === '') {
            setFilteredClients(clients)
        }else if (value === 'nome') {
            const filtered = [...clients].sort((a, b) => a.nome.localeCompare(b.nome))
            setFilteredClients(filtered)
        } else if(value === 'cpfcnpj') {
            const filtered = [...clients].sort((a, b) => a.cpfCnpj.localeCompare(b.cpfCnpj))
            setFilteredClients(filtered)
        }

        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedClients = filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE)

    return (
        <div className="clients-page-container text-center">
            <h1 className='font-bold'>Lista de Clientes</h1>
            <ClientTable clients={paginatedClients} onSearch={handleSearch} filterBy={handleFilter} />
            <div className="pagination m-3 text-left">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active m-2' : 'm-2'}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <p className="text-center text-gray-500 mt-4">
                Teste Estágio
            </p>
        </div>
    )
}
