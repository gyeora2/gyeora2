import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
  goToSignup: () => void;
}

export default function Login({ onLoginSuccess, goToSignup }: LoginProps) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-[440px] bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-black antialiased mb-1" style={{ color: '#000' }}>로그인</h2>
          <p className="text-xs font-medium text-gray-500">다시 만나 반가워요. 나만의 템플릿을 이어서 만들어 보세요.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1">이메일</label>
            <input
              type="email"
              placeholder="이메일 주소를 입력해 주세요"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <button
          onClick={() => {
            alert('로그인 성공!');
            onLoginSuccess();
          }}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition shadow-md"
        >
          로그인
        </button>

        <div className="text-center text-xs text-gray-500">
          아직 JUST 계정이 없으신가요?{' '}
          <span 
            onClick={goToSignup} 
            className="font-bold text-black cursor-pointer underline cursor-pointer"
          >
            회원가입
          </span>
        </div>
      </div>
    </main>
  );
}