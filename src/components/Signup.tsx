import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface SignupProps {
  goToLogin: () => void;
}

export default function Signup({ goToLogin }: SignupProps) {
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleSignup = async () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    if (signupForm.password !== signupForm.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 💡 실제 Supabase 회원가입 API 호출
    const { data, error } = await supabase.auth.signUp({
      email: signupForm.email,
      password: signupForm.password,
      options: {
        data: { name: signupForm.name }, // 사용자 이름 저장
      },
    });

    if (error) {
      alert(`회원가입 실패: ${error.message}`);
      console.error('Supabase Signup Error:', error);
    } else {
      alert('회원가입이 완료되었습니다! 로그인해 주세요.');
      goToLogin();
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 py-10 overflow-y-auto">
      <div className="w-full max-w-[440px] bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-black antialiased mb-1" style={{ color: '#000' }}>회원가입</h2>
          <p className="text-xs font-medium text-gray-500">나만의 이야기를 담을 준비가 되셨나요? JUST에서 첫 템플릿을 만들어 보세요.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1">이름</label>
            <input
              type="text"
              placeholder="이름을 입력해 주세요"
              value={signupForm.name}
              onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">이메일</label>
            <input
              type="email"
              placeholder="이메일 주소를 입력해 주세요"
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={signupForm.password}
              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">영문, 숫자를 포함해 6자 이상 입력해 주세요.</span>
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              value={signupForm.passwordConfirm}
              onChange={(e) => setSignupForm({ ...signupForm, passwordConfirm: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white text-black font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition shadow-md cursor-pointer"
        >
          회원가입
        </button>

        <div className="text-center text-xs text-gray-500">
          이미 JUST 계정이 있으신가요?{' '}
          <span 
            onClick={goToLogin} 
            className="font-bold text-black cursor-pointer underline"
          >
            로그인
          </span>
        </div>
      </div>
    </main>
  );
}