import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Signup from './components/Signup';
import MainBuilder from './components/MainBuilder';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'main'>('login');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // 1. 현재 로그인 세션 확인
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
      if (session) setCurrentView('main');
    });

    // 2. 로그인 상태 변경 실시간 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setSession(session);
      if (session) {
        setCurrentView('main');
      } else {
        setCurrentView('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans antialiased">
      
      {/* 상단 공통 헤더 */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm print:hidden">
        <h1 
          className="text-xl font-black tracking-wider cursor-pointer antialiased" 
          style={{ color: '#000' }}
          onClick={() => setCurrentView('main')}
        >
          JUST
        </h1>
        <div className="flex gap-4">
          {!session ? (
            <>
              <button 
                onClick={() => setCurrentView('login')}
                className={`text-sm font-bold ${currentView === 'login' ? 'text-black underline' : 'text-gray-500 hover:text-black'}`}
              >
                로그인
              </button>
              <button 
                onClick={() => setCurrentView('signup')}
                className={`text-sm font-bold ${currentView === 'signup' ? 'text-black underline' : 'text-gray-500 hover:text-black'}`}
              >
                회원가입
              </button>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="text-sm font-bold bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition cursor-pointer"
            >
              로그아웃
            </button>
          )}
        </div>
      </header>

      {/* 뷰에 따른 컴포넌트 렌더링 (강제 노출) */}
      {currentView === 'login' && <Login onLoginSuccess={() => setCurrentView('main')} goToSignup={() => setCurrentView('signup')} />}
      {currentView === 'signup' && <Signup goToLogin={() => setCurrentView('login')} />}
      {currentView === 'main' && <MainBuilder />}

    </div>
  );
}