import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Payment } from '../types';
import { members, generateRevenueData } from '../data/mockData';

export default function FinancialPage() {
  const { payments, updatePayment } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const revenueData = generateRevenueData();

  const filteredPayments = payments.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesStatus;
  });

  const stats = {
    totalReceived: payments
      .filter((p) => p.status === 'paid')
      .reduce((acc, p) => acc + p.amount, 0),
    totalPending: payments
      .filter((p) => p.status === 'pending')
      .reduce((acc, p) => acc + p.amount, 0),
    totalOverdue: payments
      .filter((p) => p.status === 'overdue')
      .reduce((acc, p) => acc + p.amount, 0),
  };

  const getMemberName = (memberId: string) => {
    return members.find((m) => m.id === memberId)?.name || 'N/A';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-slate-100 text-slate-800',
    };
    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Atrasado',
      cancelled: 'Cancelado',
    };
    return (
      <span className={`rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleMarkAsPaid = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Financeiro</h1>
        <p className="text-sm sm:text-base text-slate-500">Controle de mensalidades</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-slate-500">Total Recebido</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                R$ {stats.totalReceived.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </p>
            </div>
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-green-100 text-xl sm:text-2xl">
              💰
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-slate-500">A Receber</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                R$ {stats.totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </p>
            </div>
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-yellow-100 text-xl sm:text-2xl">
              ⏳
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-slate-500">Em Atraso</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                R$ {stats.totalOverdue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </p>
            </div>
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-red-100 text-xl sm:text-2xl">
              ⚠️
            </div>
          </div>
        </div>
      </div>

      {/* Receita Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Receita Mensal</h3>
        <div className="h-36 sm:h-48">
          <div className="flex h-full items-end justify-between gap-1 sm:gap-2">
            {revenueData.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-1 sm:gap-2">
                <div className="flex w-full flex-col items-center gap-0.5 sm:gap-1">
                  <div
                    className="w-full rounded-t bg-slate-300"
                    style={{ height: `${(item.expenses / 8000) * 80}px` }}
                  />
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-green-500 to-green-400"
                    style={{ height: `${(item.revenue / 8000) * 80}px` }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded bg-green-400" />
            <span className="text-slate-600">Receita</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded bg-slate-300" />
            <span className="text-slate-600">Despesas</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 shrink-0"
        >
          <option value="all">Todos</option>
          <option value="paid">Pagos</option>
          <option value="pending">Pendentes</option>
          <option value="overdue">Atrasados</option>
        </select>
      </div>

      {/* Payments List - Cards para mobile */}
      <div className="sm:hidden space-y-3">
        {filteredPayments.slice(0, 20).map((payment) => (
          <div key={payment.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-800 truncate">{getMemberName(payment.memberId)}</p>
                <p className="text-lg font-bold text-slate-800 mt-1">R$ {payment.amount.toFixed(2)}</p>
              </div>
              {getStatusBadge(payment.status)}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Vence: {formatDate(payment.dueDate)}</span>
              <span>{payment.referenceMonth}</span>
            </div>
            {payment.status !== 'paid' && (
              <button
                onClick={() => handleMarkAsPaid(payment)}
                className="mt-3 w-full rounded-lg bg-green-100 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
              >
                Marcar como Pago
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Payments Table - Desktop */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Aluno</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Vencimento</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Ref.</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <p className="font-medium text-slate-800">{getMemberName(payment.memberId)}</p>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                  R$ {payment.amount.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {formatDate(payment.dueDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {payment.referenceMonth}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {getStatusBadge(payment.status)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {payment.status !== 'paid' && (
                    <button
                      onClick={() => handleMarkAsPaid(payment)}
                      className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-200"
                    >
                      Marcar Pago
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-800">Confirmar Pagamento</h3>
            <p className="mt-2 text-sm text-slate-500">
              Deseja marcar o pagamento de <strong>{getMemberName(selectedPayment.memberId)}</strong> como pago?
            </p>
            <p className="mt-2 text-lg font-bold text-slate-800">
              R$ {selectedPayment.amount.toFixed(2)}
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700">Forma de Pagamento</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                id="payment-method"
              >
                <option value="pix">PIX</option>
                <option value="credit_card">Cartão de Crédito</option>
                <option value="debit_card">Cartão de Débito</option>
                <option value="cash">Dinheiro</option>
                <option value="bank_transfer">Transferência</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const method = (document.getElementById('payment-method') as HTMLSelectElement).value as Payment['paymentMethod'];
                  updatePayment(selectedPayment.id, {
                    status: 'paid',
                    paymentDate: new Date().toISOString().split('T')[0],
                    paymentMethod: method,
                  });
                  setShowPaymentModal(false);
                }}
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
