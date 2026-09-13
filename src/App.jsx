import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootWrapper } from './components/RootWrapper';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Vitals } from './pages/Vitals';
import { Medications } from './pages/Medications';
import { Emergency } from './pages/Emergency';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Reports } from './pages/Reports';
import { Profile } from './pages/Profile';
import { DoctorConnect } from './pages/DoctorConnect';
import { Background3D } from './components/Background3D';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSkeleton } from './components/ui/Feedback';

// Lazy Load Large Routes
const Fitness = React.lazy(() => import('./pages/Fitness').then(module => ({ default: module.Fitness })));
const WorkoutActive = React.lazy(() => import('./pages/WorkoutActive').then(module => ({ default: module.WorkoutActive })));
const FittyAI = React.lazy(() => import('./pages/FittyAI').then(module => ({ default: module.FittyAI })));
const Nutrition = React.lazy(() => import('./pages/Nutrition').then(module => ({ default: module.Nutrition })));
const Progress = React.lazy(() => import('./pages/Progress').then(module => ({ default: module.Progress })));
const Goals = React.lazy(() => import('./pages/Goals').then(module => ({ default: module.Goals })));

const FallbackLoader = () => (
  <div style={{ padding: '2rem' }}>
    <LoadingSkeleton height="60px" style={{ marginBottom: '2rem' }} />
    <LoadingSkeleton height="200px" style={{ marginBottom: '1.5rem' }} />
    <LoadingSkeleton height="200px" />
  </div>
);

function App() {
  return (
    <>
      <Background3D />
      <ErrorBoundary>
        <Routes>
          <Route element={<RootWrapper />}>
          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Authenticated Routes (wrapped in Layout) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="vitals" element={<Vitals />} />
            <Route path="medications" element={<Medications />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
            <Route path="doctor-connect" element={<DoctorConnect />} />
            
            {/* Lazy Fitness Routes */}
            <Route path="fitness" element={<Suspense fallback={<FallbackLoader />}><Fitness /></Suspense>} />
            <Route path="fitness/workout/:id" element={<Suspense fallback={<FallbackLoader />}><WorkoutActive /></Suspense>} />
            <Route path="fitty" element={<Suspense fallback={<FallbackLoader />}><FittyAI /></Suspense>} />
            <Route path="nutrition" element={<Suspense fallback={<FallbackLoader />}><Nutrition /></Suspense>} />
            <Route path="progress" element={<Suspense fallback={<FallbackLoader />}><Progress /></Suspense>} />
            <Route path="goals" element={<Suspense fallback={<FallbackLoader />}><Goals /></Suspense>} />
          </Route>
        </Route>
      </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
