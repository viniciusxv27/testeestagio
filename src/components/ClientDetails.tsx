import { useState } from 'react'
import { Cliente } from '../interfaces/Cliente'
import { Conta } from '../interfaces/Conta'
import { Agencia } from '../interfaces/Agencia'
import { formatCpfCnpj } from '../utils/formatCpf'
import { formatCurrency } from '../utils/formatCurrency'

interface ClientDetailsProps {
    client: Cliente
    contas: Conta[]
    agencia: Agencia | null
}

export default function ClientDetails({ client, contas, agencia }: ClientDetailsProps) {
    const [activeTab, setActiveTab] = useState<'info' | 'contas' | 'agencia'>('info')

    return (
        <div className="p-4 bg-white shadow-md rounded-xl">
            <div className="flex space-x-4 mb-4 border-b">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`py-2 px-4 font-medium ${activeTab === 'info' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Informações
                </button>
                <button
                    onClick={() => setActiveTab('agencia')}
                    className={`py-2 px-4 font-medium ${activeTab === 'agencia' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Agência
                </button>
                <button
                    onClick={() => setActiveTab('contas')}
                    className={`py-2 px-4 font-medium ${activeTab === 'contas' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Contas
                </button>
            </div>

            {activeTab === 'info' && (
                <div className="grid gap-2 text-sm text-gray-700">
                    <p><strong>Nome:</strong> {client.nome}</p>
                    <p><strong>CPF/CNPJ:</strong> {formatCpfCnpj(client.cpfCnpj)}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    { client.rg && (
                        <p><strong>RG:</strong> {client.rg}</p>
                    )}
                    <p><strong>Data de nascimento:</strong> {new Date(client.dataNascimento).toLocaleDateString('pt-BR')}</p>
                    { client.nomeSocial && (
                        <p><strong>Nome Social:</strong> {client.nomeSocial}</p>
                    )}
                    <p><strong>Endereço:</strong> {client.endereco}</p>
                    <p><strong>Renda:</strong> {formatCurrency(Number(client.rendaAnual))}</p>
                    <p><strong>Patrimônio:</strong> {formatCurrency(Number(client.patrimonio))}</p>
                    <p><strong>Estado Civil:</strong> {client.estadoCivil}</p>
                </div>
            )}

            {activeTab === 'contas' && (
                <div className="space-y-4">
                    {contas.length > 0 ? (
                        contas.map((conta) => (
                            <div key={conta.id} className="border p-4 rounded-md bg-gray-50">
                                <p><strong>Tipo:</strong> {conta.tipo.charAt(0).toUpperCase() + conta.tipo.slice(1)}</p>
                                <p><strong>Saldo:</strong> {isNaN(Number(conta.saldo)) ? 'Retorno inesperado da API' : formatCurrency(Number(conta.saldo))}</p>
                                <p><strong>Limite de Crédito:</strong> {formatCurrency(Number(conta.limiteCredito))}</p>
                                <p><strong>Crédito Disponível:</strong> {formatCurrency(Number(conta.creditoDisponivel))}</p>
                            </div>
                        ))
                    ) : (
                        <div className="grid gap-2 text-sm text-gray-700">
                            <p>Usuário não possui conta.</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'agencia' && agencia && (
                <div className="grid gap-2 text-sm text-gray-700">
                    <p><strong>Nome:</strong> {agencia.nome}</p>
                    <p><strong>Código da Agência:</strong> {agencia.codigo}</p>
                    <p><strong>Endereço:</strong> {agencia.endereco}</p>
                </div>
            )}

            {activeTab === 'agencia' && !agencia && (
                <div className="grid gap-2 text-sm text-gray-700">
                    <p>Usuário não possui agência.</p>
                </div>
            )}


        </div>
    )
}
