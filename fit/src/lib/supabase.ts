// Configuração do Supabase
// Para usar em produção, crie uma conta em https://supabase.com
// e substitua estas variáveis pelas suas credenciais

/// <reference types="vite/client" />

export const supabaseConfig = {
  url: (import.meta as any).env?.VITE_SUPABASE_URL || '',
  anonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
};

// Por enquanto, usamos localStorage como banco de dados local
// Para migrar para Supabase, basta descomentar o código abaixo
// e configurar as variáveis de ambiente

/*
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

// Tabelas necessárias no Supabase:
// 
// CREATE TABLE academies (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name TEXT NOT NULL,
//   slug TEXT UNIQUE NOT NULL,
//   cnpj TEXT,
//   address TEXT,
//   phone TEXT,
//   email TEXT,
//   logo_url TEXT,
//   plan TEXT DEFAULT 'starter',
//   max_members INT DEFAULT 200,
//   active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW(),
//   owner_id UUID REFERENCES auth.users(id)
// );
//
// CREATE TABLE users (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   email TEXT UNIQUE NOT NULL,
//   name TEXT NOT NULL,
//   role TEXT DEFAULT 'admin',
//   academy_id UUID REFERENCES academies(id),
//   active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW()
// );
//
// CREATE TABLE members (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   academy_id UUID REFERENCES academies(id) NOT NULL,
//   name TEXT NOT NULL,
//   email TEXT,
//   phone TEXT,
//   cpf TEXT,
//   birth_date DATE,
//   gender TEXT,
//   address TEXT,
//   emergency_contact TEXT,
//   photo_url TEXT,
//   status TEXT DEFAULT 'pending',
//   membership_plan_id UUID,
//   join_date DATE,
//   last_visit DATE,
//   visits_count INT DEFAULT 0,
//   notes TEXT,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
//
// CREATE TABLE membership_plans (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   academy_id UUID REFERENCES academies(id) NOT NULL,
//   name TEXT NOT NULL,
//   description TEXT,
//   price DECIMAL(10,2) NOT NULL,
//   duration_months INT DEFAULT 1,
//   max_weekly_visits INT,
//   features JSONB,
//   active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW()
// );
//
// CREATE TABLE payments (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   academy_id UUID REFERENCES academies(id) NOT NULL,
//   member_id UUID REFERENCES members(id) NOT NULL,
//   amount DECIMAL(10,2) NOT NULL,
//   due_date DATE NOT NULL,
//   payment_date DATE,
//   status TEXT DEFAULT 'pending',
//   payment_method TEXT,
//   reference_month TEXT,
//   notes TEXT,
//   created_at TIMESTAMP DEFAULT NOW()
// );
//
// CREATE TABLE workout_plans (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   academy_id UUID REFERENCES academies(id) NOT NULL,
//   member_id UUID REFERENCES members(id) NOT NULL,
//   instructor_id UUID,
//   name TEXT NOT NULL,
//   objective TEXT,
//   start_date DATE,
//   end_date DATE,
//   exercises JSONB,
//   active BOOLEAN DEFAULT true,
//   notes TEXT,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
//
// CREATE TABLE class_schedules (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   academy_id UUID REFERENCES academies(id) NOT NULL,
//   name TEXT NOT NULL,
//   instructor TEXT,
//   day_of_week INT,
//   start_time TEXT,
//   end_time TEXT,
//   max_capacity INT,
//   current_capacity INT DEFAULT 0,
//   room TEXT,
//   difficulty TEXT,
//   active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP DEFAULT NOW()
// );
//
// CREATE TABLE instructors (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   academy_id UUID REFERENCES academies(id) NOT NULL,
//   name TEXT NOT NULL,
//   email TEXT,
//   phone TEXT,
//   cref TEXT,
//   specialties JSONB,
//   photo_url TEXT,
//   status TEXT DEFAULT 'active',
//   created_at TIMESTAMP DEFAULT NOW()
// );
//
// CREATE TABLE alerts (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   academy_id UUID REFERENCES academies(id) NOT NULL,
//   type TEXT NOT NULL,
//   title TEXT NOT NULL,
//   description TEXT,
//   member_id UUID REFERENCES members(id),
//   member_name TEXT,
//   priority TEXT DEFAULT 'medium',
//   is_read BOOLEAN DEFAULT false,
//   created_at TIMESTAMP DEFAULT NOW()
// );
//
// -- RLS Policies para Multi-tenant
// ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
// ALTER TABLE members ENABLE ROW LEVEL SECURITY;
// ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
// ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
// ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;
// ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
// ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
//
// CREATE POLICY "Users can only see their academy data" ON members
//   USING (academy_id IN (SELECT academy_id FROM users WHERE id = auth.uid()));
*/
