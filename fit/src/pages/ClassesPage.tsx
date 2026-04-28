import { useState } from 'react';
import { useApp } from '../context/AppContext';

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function ClassesPage() {
  const { classSchedules } = useApp();
  const [viewMode, setViewMode] = useState<'schedule' | 'list'>('list');

  const getDifficultyBadge = (difficulty: string) => {
    const styles = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
      all: 'bg-blue-100 text-blue-800',
    };
    const labels = {
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      all: 'Todos',
    };
    return (
      <span className={`rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${styles[difficulty as keyof typeof styles]}`}>
        {labels[difficulty as keyof typeof labels]}
      </span>
    );
  };

  const getCapacityColor = (current: number, max: number) => {
    const percent = current / max;
    if (percent >= 0.9) return 'bg-red-500';
    if (percent >= 0.7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Aulas Coletivas</h1>
          <p className="text-sm sm:text-base text-slate-500">Grade de aulas e agendamentos</p>
        </div>
        <button className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-200">
          + Nova Aula
        </button>
      </div>

      {/* Today's Classes */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">
          Aulas de Hoje ({dayNames[new Date().getDay()]})
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classSchedules
            .filter((c) => c.dayOfWeek === new Date().getDay())
            .map((cls) => (
              <div key={cls.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-slate-800 text-sm sm:text-base">{cls.name}</h4>
                    <p className="text-xs sm:text-sm text-slate-500">{cls.instructor}</p>
                  </div>
                  {getDifficultyBadge(cls.difficulty)}
                </div>
                <div className="mt-2 sm:mt-3 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-600">
                    {cls.startTime} - {cls.endTime}
                  </span>
                  <span className="text-slate-600">{cls.room}</span>
                </div>
                <div className="mt-2 sm:mt-3">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 mb-1">
                    <span>Capacidade</span>
                    <span>{cls.currentCapacity}/{cls.maxCapacity}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${getCapacityColor(cls.currentCapacity, cls.maxCapacity)}`}
                      style={{ width: `${(cls.currentCapacity / cls.maxCapacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          {classSchedules.filter((c) => c.dayOfWeek === new Date().getDay()).length === 0 && (
            <div className="col-span-full text-center py-8 text-slate-500 text-sm">
              Nenhuma aula programada para hoje
            </div>
          )}
        </div>
      </div>

      {/* View Toggle */}
      <div className="hidden sm:flex items-center gap-3">
        <button
          onClick={() => setViewMode('schedule')}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            viewMode === 'schedule' ? 'bg-orange-100 text-orange-600' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          📅 Grade
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          📋 Lista
        </button>
      </div>

      {/* Schedule View - Desktop only */}
      {viewMode === 'schedule' && (
        <div className="hidden sm:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="sticky left-0 bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Horário
                  </th>
                  {dayNames.slice(1, 6).map((day) => (
                    <th key={day} className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map((hour) => (
                  <tr key={hour} className="hover:bg-slate-50">
                    <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-slate-600">
                      {hour}
                    </td>
                    {dayNames.slice(1, 6).map((_, dayIndex) => {
                      const classesAtTime = classSchedules.filter(
                        (c) => c.dayOfWeek === dayIndex + 1 && c.startTime <= hour && c.endTime > hour
                      );
                      return (
                        <td key={dayIndex} className="px-2 py-1">
                          <div className="space-y-1">
                            {classesAtTime.map((cls) => (
                              <div
                                key={cls.id}
                                className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 p-2 text-xs text-white cursor-pointer hover:shadow-md transition-shadow"
                              >
                                <p className="font-medium">{cls.name}</p>
                                <p className="opacity-90">{cls.instructor}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* List View - Cards for mobile, Table for desktop */}
      <div className="sm:hidden space-y-3">
        {classSchedules.map((cls) => (
          <div key={cls.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-slate-800">{cls.name}</h4>
                <p className="text-sm text-slate-500">{cls.instructor}</p>
              </div>
              {getDifficultyBadge(cls.difficulty)}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
              <span>{dayNames[cls.dayOfWeek]}</span>
              <span>{cls.startTime} - {cls.endTime}</span>
              <span>{cls.room}</span>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Capacidade</span>
                <span>{cls.currentCapacity}/{cls.maxCapacity}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${getCapacityColor(cls.currentCapacity, cls.maxCapacity)}`}
                  style={{ width: `${(cls.currentCapacity / cls.maxCapacity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Aula</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Dia/Horário</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Instrutor</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Sala</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Capacidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Nível</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {classSchedules.map((cls) => (
              <tr key={cls.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <p className="font-medium text-slate-800">{cls.name}</p>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <p className="text-slate-800">{dayNames[cls.dayOfWeek]}</p>
                  <p className="text-sm text-slate-500">{cls.startTime} - {cls.endTime}</p>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {cls.instructor}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {cls.room}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${getCapacityColor(cls.currentCapacity, cls.maxCapacity)}`}
                        style={{ width: `${(cls.currentCapacity / cls.maxCapacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-500">{cls.currentCapacity}/{cls.maxCapacity}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {getDifficultyBadge(cls.difficulty)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
