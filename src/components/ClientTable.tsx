import { useState } from 'react'
import { Cliente } from '../interfaces/Cliente'
import { formatCpfCnpj } from '../utils/formatCpf'

interface ClientTableProps {
  clients: Cliente[]
  onSearch: (value: string) => void
  filterBy: (value: string) => void
}

export default function ClientTable({ clients, onSearch, filterBy }: ClientTableProps) {
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onSearch(value)
  }

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    filterBy(value)
  }

  return (
    <div className="card">
      <div className="p-4 mt-4 text-left">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={search}
            onChange={handleSearch}
            className="mb-4 w-full max-w-sm px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

            <select
            onChange={handleFilter}
            className="mb-4 w-1/4 px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="">Filtrar por</option>
            <option value="nome">Nome</option>
            <option value="cpfcnpj">CPF/CNPJ</option>
            </select>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="max-w-full divide-y divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-100">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-100">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-100">CPF/CNPJ</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-100">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 text-left py-4 text-sm text-gray-700">{client.nome}</td>
                  <td className="px-6 text-left py-4 text-sm text-gray-700">{client.email}</td>
                  <td className="px-6 text-left py-4 text-sm text-gray-700">{formatCpfCnpj(client.cpfCnpj)}</td>
                  <td className="px-6 text-left py-4 text-sm">
                    <a
                      href={`/clients/${client.id}`}
                      className="buttonDetail px-3 py-2 text-xs font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Ver detalhes
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
