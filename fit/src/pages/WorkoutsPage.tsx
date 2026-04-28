import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WorkoutPlan, WorkoutExercise } from '../types';

export default function WorkoutsPage() {
  const { members, instructors, getWorkoutsByMember } = useApp();
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);
  const [showMemberList, setShowMemberList] = useState(false);

  // Set first member as default when members load
  const autoSelectId = members.length > 0 && !selectedMemberId ? members[0].id : selectedMemberId;
  const memberWorkouts = (selectedMemberId || autoSelectId) ? getWorkoutsByMember(selectedMemberId || autoSelectId) : [];
  const selectedMember = members.find((m) => m.id === selectedMemberId);

  const getInstructorName = (instructorId: string) => {
    return instructors.find((i) => i.id === instructorId)?.name || 'N/A';
  };

  const muscleGroupColors: Record<string, string> = {
    Peito: 'bg-blue-100 text-blue-800',
    Costas: 'bg-green-100 text-green-800',
    Ombro: 'bg-purple-100 text-purple-800',
    Bíceps: 'bg-orange-100 text-orange-800',
    Tríceps: 'bg-pink-100 text-pink-800',
    Pernas: 'bg-red-100 text-red-800',
    Quadríceps: 'bg-yellow-100 text-yellow-800',
    Posterior: 'bg-indigo-100 text-indigo-800',
    Panturrilha: 'bg-teal-100 text-teal-800',
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Fichas de Treino</h1>
        <p className="text-sm sm:text-base text-slate-500">Gerencie os treinos dos alunos</p>
      </div>

      {/* Mobile Member Selector */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowMemberList(!showMemberList)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-sm font-bold text-white">
              {selectedMember?.name.charAt(0)}
            </div>
            <span className="font-medium text-slate-800">{selectedMember?.name}</span>
          </div>
          <svg className={`h-5 w-5 text-slate-400 transition-transform ${showMemberList ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showMemberList && (
          <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
            {members.filter(m => m.status === 'active').slice(0, 10).map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedMemberId(member.id);
                  setSelectedWorkout(null);
                  setShowMemberList(false);
                }}
                className="flex w-full items-center gap-3 p-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-0"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-xs font-bold text-white">
                  {member.name.charAt(0)}
                </div>
                <span className="text-sm text-slate-800">{member.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
        {/* Member List - Desktop */}
        <div className="hidden lg:block rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-semibold text-slate-800">Alunos</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {members.filter(m => m.status === 'active').slice(0, 10).map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedMemberId(member.id);
                  setSelectedWorkout(null);
                }}
                className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors ${
                  selectedMemberId === member.id
                    ? 'bg-orange-50 border border-orange-200'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-sm font-bold text-white">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.visitsCount} visitas</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Workout List */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
              Treinos {selectedMember?.name?.split(' ')[0] ? `de ${selectedMember.name.split(' ')[0]}` : ''}
            </h3>
            <button className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1.5 text-xs font-medium text-white">
              + Novo
            </button>
          </div>
          <div className="space-y-2">
            {memberWorkouts.length > 0 ? (
              memberWorkouts.map((workout) => (
                <button
                  key={workout.id}
                  onClick={() => setSelectedWorkout(workout)}
                  className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                    selectedWorkout?.id === workout.id
                      ? 'bg-orange-50 border border-orange-200'
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-lg">
                    🏋️
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate text-sm">{workout.name}</p>
                    <p className="text-xs text-slate-500">{workout.exercises.length} exercícios</p>
                  </div>
                  {workout.active && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700 shrink-0">
                      Ativo
                    </span>
                  )}
                </button>
              ))
            ) : (
              <p className="text-center text-sm text-slate-500 py-8">
                Nenhum treino cadastrado
              </p>
            )}
          </div>
        </div>

        {/* Exercise Details */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          {selectedWorkout ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800">{selectedWorkout.name}</h3>
                  <p className="text-sm text-slate-500">{selectedWorkout.objective}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs sm:text-sm text-slate-600 hover:bg-slate-50">
                    Editar
                  </button>
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs sm:text-sm text-slate-600 hover:bg-slate-50">
                    📋
                  </button>
                </div>
              </div>
              
              <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <span>👤</span>
                  <span className="font-medium text-slate-800">{getInstructorName(selectedWorkout.instructorId)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>📅</span>
                  <span className="font-medium text-slate-800">{new Date(selectedWorkout.startDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} index={index} muscleGroupColors={muscleGroupColors} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-64 sm:h-96 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-slate-100 text-3xl mb-4">
                🏋️
              </div>
              <p className="text-sm sm:text-base text-slate-500">Selecione um treino para visualizar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, index, muscleGroupColors }: { 
  exercise: WorkoutExercise; 
  index: number;
  muscleGroupColors: Record<string, string>;
}) {
  return (
    <div className="flex items-start gap-3 sm:gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
      <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs sm:text-sm font-bold text-white">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-slate-800 text-sm sm:text-base">{exercise.name}</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${muscleGroupColors[exercise.muscleGroup] || 'bg-slate-100 text-slate-800'}`}>
            {exercise.muscleGroup}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500">
          <span>{exercise.sets}x{exercise.reps}</span>
          {exercise.weight && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>{exercise.weight}</span>
            </>
          )}
          <span>•</span>
          <span>{exercise.restSeconds}s</span>
        </div>
      </div>
    </div>
  );
}
