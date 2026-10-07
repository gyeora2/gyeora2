import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { supabase } from '../supabaseClient';
interface MainBuilderProps {
  session?: any;
}
export default function MainBuilder({session}:MainBuilderProps) {
  /*  // 컴포넌트가 처음 뜰 때 DB에서 이력서 데이터 불러오기
 useEffect(() => {
    const fetchResume = async () => {
      // 1. 현재 로그인된 유저 세션 직접 가져오기
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !session.user) {
        console.log('로그인된 유저가 없습니다.');
        return;
      }

      console.log('DB에서 이력서 데이터 불러오는 중... 유저 ID:', session.user.id);

      // 2. 해당 유저의 이력서 데이터 조회
      const { data, error } = await supabase
        .from('resumes')
        .select('resume_data')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('이력서 불러오기 에러:', error.message);
        return;
      }

      if (data && data.resume_data) {
        console.log('불러오기 성공:', data.resume_data);
        setResumeData(data.resume_data);
      } else {
        console.log('저장된 데이터가 없어 기본 양식으로 시작합니다.');
      }
    };

    fetchResume();
  }, []); // 의존성 배열을 비워두어 컴포넌트가 처음 뜰 때 확실하게 실행되도록 합니다.*/

  const [resumeData, setResumeData] = useState({
    templateType: '개발자', // '개발자' | '디자이너' | '기획자'
    name: '홍길동',
    birth: '2000.01.01',
    email: 'example@email.com',
    phone: '010-0000-0000',
    summary: '자신을 소개해 주세요...',
    skills: ['React', 'TypeScript', 'Node.js'],
    newSkill: '',
    education: {
      school: '',
      period: '2019.03 - 2023.02',
      major: '',
    },
    certificates: ['정보처리기사', 'SQLD'],
    newCert: '',
    experience: {
      company: '',
      period: '2022.03 - 현재',
      description: '',
    },
    project: {
      title: '',
      role: '프론트엔드 개발',
      description: '',
    },
  });

  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      education: { ...prev.education, [name]: value },
    }));
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      experience: { ...prev.experience, [name]: value },
    }));
  };
  const handleSaveResume = async () => {
    if (!session || !session.user) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    try {
      // 1. 이미 저장된 데이터가 있는지 확인
      const { data: existingData } = await supabase
        .from('resumes')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (existingData) {
        // 2. 이미 있다면 업데이트 (Update)
        const { error } = await supabase
          .from('resumes')
          .update({ resume_data: resumeData })
          .eq('user_id', session.user.id);

        if (error) throw error;
      } else {
        // 3. 없으면 새로 생성 (Insert)
        const { error } = await supabase
          .from('resumes')
          .insert([{ user_id: session.user.id, resume_data: resumeData }]);

        if (error) throw error;
      }

      alert('이력서가 성공적으로 저장되었습니다!');
    } catch (error: any) {
      alert(`저장 실패: ${error.message}`);
    }
  };


  
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      project: { ...prev.project, [name]: value },
    }));
  };

  const addSkill = () => {
    if (!resumeData.newSkill.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, prev.newSkill.trim()],
      newSkill: '',
    }));
  };

  const removeSkill = (indexToRemove: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove),
    }));
  };

  const addCert = () => {
    if (!resumeData.newCert.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, prev.newCert.trim()],
      newCert: '',
    }));
  };

  const removeCert = (indexToRemove: number) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, index) => index !== indexToRemove),
    }));
  };

 // 브라우저 인쇄 기능을 활용한 가장 안전하고 깔끔한 PDF 저장 함수
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <main className="flex-1 flex flex-row p-6 gap-6 max-w-[1800px] mx-auto w-full overflow-hidden h-[calc(100vh-4rem)]">
      
      {/* ================= [왼쪽: 에디터 입력 폼 영역 (38%)] ================= */}
      <div className="w-[38%] bg-white rounded-2xl border border-gray-300 p-8 overflow-y-auto shadow-sm flex flex-col gap-6 text-black">
        
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-black">템플릿 유형</label>
          <select
            name="templateType"
            value={resumeData.templateType}
            onChange={handleResumeChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="개발자">개발자 템플릿</option>
            <option value="디자이너">디자이너 템플릿</option>
            <option value="기획자">기획자 템플릿</option>
          </select>
        </div>

        <hr className="border-gray-200" />

        {/* 1. 인적사항 */}
        <div className="flex flex-col gap-4 text-black">
          <h2 className="text-md font-extrabold antialiased flex items-center gap-2" style={{ color: '#000' }}>
            <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">1</span>
            인적사항
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-black mb-1">이름</label>
              <input
                type="text"
                name="name"
                value={resumeData.name}
                onChange={handleResumeChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1">생년월일</label>
              <input
                type="text"
                name="birth"
                value={resumeData.birth}
                onChange={handleResumeChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">이메일</label>
            <input
              type="email"
              name="email"
              value={resumeData.email}
              onChange={handleResumeChange}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">연락처</label>
            <input
              type="text"
              name="phone"
              value={resumeData.phone}
              onChange={handleResumeChange}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* 2. 소개 */}
        <div className="flex flex-col gap-3 text-black">
          <h2 className="text-md font-extrabold antialiased flex items-center gap-2" style={{ color: '#000' }}>
            <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">2</span>
            소개
          </h2>
          <textarea
            name="summary"
            value={resumeData.summary}
            onChange={handleResumeChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <hr className="border-gray-200" />

        {/* 3. 학력 */}
        <div className="flex flex-col gap-4 text-black">
          <h2 className="text-md font-extrabold antialiased flex items-center gap-2" style={{ color: '#000' }}>
            <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">3</span>
            학력
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-black mb-1">학교명</label>
              <input
                type="text"
                name="school"
                value={resumeData.education.school}
                onChange={handleEducationChange}
                placeholder="OO대학교"
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1">기간</label>
              <input
                type="text"
                name="period"
                value={resumeData.education.period}
                onChange={handleEducationChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">전공 및 학위</label>
            <input
              type="text"
              name="major"
              value={resumeData.education.major}
              onChange={handleEducationChange}
              placeholder="컴퓨터공학 전공 (학사)"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* 4. 스택 */}
        <div className="flex flex-col gap-3 text-black">
          <h2 className="text-md font-extrabold antialiased flex items-center gap-2" style={{ color: '#000' }}>
            <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">4</span>
            스택
          </h2>
          <div className="flex flex-wrap gap-2 items-center">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                onClick={() => removeSkill(index)}
                className="bg-gray-100 border border-gray-400 text-black font-bold text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition"
                title="클릭시 삭제"
              >
                {skill} ×
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              name="newSkill"
              value={resumeData.newSkill}
              onChange={handleResumeChange}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              placeholder="추가할 스택 입력"
              className="flex-1 px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold text-sm rounded-lg transition"
            >
              + 추가
            </button>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* 5. 자격증 */}
        <div className="flex flex-col gap-3 text-black">
          <h2 className="text-md font-extrabold antialiased flex items-center gap-2" style={{ color: '#000' }}>
            <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">5</span>
            자격증
          </h2>
          <div className="flex flex-wrap gap-2 items-center">
            {resumeData.certificates.map((cert, index) => (
              <span
                key={index}
                onClick={() => removeCert(index)}
                className="bg-gray-100 border border-gray-400 text-black font-bold text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition"
                title="클릭시 삭제"
              >
                {cert} ×
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              name="newCert"
              value={resumeData.newCert}
              onChange={handleResumeChange}
              onKeyDown={(e) => e.key === 'Enter' && addCert()}
              placeholder="추가할 자격증 입력"
              className="flex-1 px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={addCert}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold text-sm rounded-lg transition"
            >
              + 추가
            </button>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* 6. 경력 */}
        <div className="flex flex-col gap-4 text-black">
          <h2 className="text-md font-extrabold antialiased flex items-center gap-2" style={{ color: '#000' }}>
            <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">6</span>
            경력
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-black mb-1">회사명</label>
              <input
                type="text"
                name="company"
                value={resumeData.experience.company}
                onChange={handleExperienceChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1">기간</label>
              <input
                type="text"
                name="period"
                value={resumeData.experience.period}
                onChange={handleExperienceChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">담당 업무</label>
            <textarea
              name="description"
              value={resumeData.experience.description}
              onChange={handleExperienceChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* 7. 프로젝트 */}
        <div className="flex flex-col gap-4 text-black">
          <h2 className="text-md font-extrabold antialiased flex items-center gap-2" style={{ color: '#000' }}>
            <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">7</span>
            프로젝트
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-black mb-1">프로젝트명</label>
              <input
                type="text"
                name="title"
                value={resumeData.project.title}
                onChange={handleProjectChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1">역할</label>
              <input
                type="text"
                name="role"
                value={resumeData.project.role}
                onChange={handleProjectChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">프로젝트 설명</label>
            <textarea
              name="description"
              value={resumeData.project.description}
              onChange={handleProjectChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm bg-white text-black font-medium focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
        </div>
                <button
  onClick={handleSaveResume}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition shadow-sm cursor-pointer mb-4"
>
  💾 이력서 저장하기
</button>
      </div>

      {/* ================= [오른쪽: 실시간 A4 미리보기 영역 (62%)] ================= */}
      <div className="w-[62%] bg-gray-200 rounded-2xl flex flex-col items-center p-6 shadow-inner overflow-y-auto text-black gap-4">
        
        <div className="w-full flex justify-between items-center px-4 shrink-0 max-w-[595px]">
          <span className="text-xs font-bold text-black uppercase tracking-wider">나만의 템플릿 ({resumeData.templateType})</span>
          <span className="text-xs font-bold text-black">미리보기</span>
        </div>

        {/* A4 용지 박스 (템플릿 유형에 따라 상단 포인트 디자인 분기) */}
        <div id="resume-preview" className="w-[595px] min-h-[842px] bg-white shadow-2xl rounded-md p-10 flex flex-col justify-between text-black shrink-0">
          <div className="space-y-6">
            
            {/* 인적사항 및 템플릿 배지 */}
            <div className="border-b border-gray-300 pb-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-black font-extrabold text-lg shrink-0 border border-gray-300">
                  {resumeData.name ? resumeData.name[0] : 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black antialiased" style={{ color: '#000' }}>{resumeData.name || '이름 없음'}</h2>
                  <p className="text-xs font-bold text-black mt-0.5">{resumeData.email} | {resumeData.phone} | {resumeData.birth}</p>
                </div>
              </div>
              {/* 템플릿 유형별 배지 디자인 분기 */}
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                resumeData.templateType === '개발자' ? 'bg-black text-white' :
                resumeData.templateType === '디자이너' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {resumeData.templateType}
              </span>
            </div>

            {/* 소개 */}
            <div>
              <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-1.5 antialiased" style={{ color: '#000' }}>소개</h4>
              <p className="text-sm font-medium text-black leading-relaxed whitespace-pre-wrap">{resumeData.summary}</p>
            </div>

            {/* 학력 */}
            <div>
              <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-1.5 antialiased" style={{ color: '#000' }}>학력</h4>
              <div className="text-sm">
                <div className="flex justify-between font-bold text-black">
                  <span>{resumeData.education.school || '학교명'}</span>
                  <span className="text-xs font-bold text-black">{resumeData.education.period}</span>
                </div>
                <p className="text-xs font-medium text-black mt-1">{resumeData.education.major || '전공 정보가 없습니다.'}</p>
              </div>
            </div>

            {/* 템플릿 유형에 따라 순서나 배치가 다르게 강조되도록 분기 (예: 개발자는 스택 상단, 기획자는 프로젝트 상단 등) */}
            {resumeData.templateType === '개발자' ? (
              <>
                {/* 스택 */}
                <div>
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-2 antialiased" style={{ color: '#000' }}>기술 스택</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.length > 0 ? (
                      resumeData.skills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-black font-bold text-xs px-2.5 py-1 rounded-md border border-gray-300">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs font-bold text-black italic">등록된 스택이 없습니다.</span>
                    )}
                  </div>
                </div>

                {/* 자격증 */}
                <div>
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-2 antialiased" style={{ color: '#000' }}>자격증</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.certificates.length > 0 ? (
                      resumeData.certificates.map((cert, idx) => (
                        <span key={idx} className="bg-gray-100 text-black font-bold text-xs px-2.5 py-1 rounded-md border border-gray-300">
                          {cert}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs font-bold text-black italic">등록된 자격증이 없습니다.</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 자격증 */}
                <div>
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-2 antialiased" style={{ color: '#000' }}>자격증</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.certificates.length > 0 ? (
                      resumeData.certificates.map((cert, idx) => (
                        <span key={idx} className="bg-gray-100 text-black font-bold text-xs px-2.5 py-1 rounded-md border border-gray-300">
                          {cert}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs font-bold text-black italic">등록된 자격증이 없습니다.</span>
                    )}
                  </div>
                </div>

                {/* 스택 */}
                <div>
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-2 antialiased" style={{ color: '#000' }}>보유 기술</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.length > 0 ? (
                      resumeData.skills.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-black font-bold text-xs px-2.5 py-1 rounded-md border border-gray-300">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs font-bold text-black italic">등록된 스택이 없습니다.</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* 경력 */}
            <div>
              <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-1.5 antialiased" style={{ color: '#000' }}>경력</h4>
              <div className="text-sm">
                <div className="flex justify-between font-bold text-black">
                  <span>{resumeData.experience.company || '회사명'}</span>
                  <span className="text-xs font-bold text-black">{resumeData.experience.period}</span>
                </div>
                <p className="text-xs font-medium text-black mt-1 whitespace-pre-wrap">{resumeData.experience.description || '담당 업무 설명이 없습니다.'}</p>
              </div>
            </div>

            {/* 프로젝트 */}
            <div>
              <h4 className="text-xs font-extrabold text-black uppercase tracking-wider mb-1.5 antialiased" style={{ color: '#000' }}>프로젝트</h4>
              <div className="text-sm">
                <div className="flex justify-between font-bold text-black">
                  <span>{resumeData.project.title || '프로젝트명'}</span>
                  <span className="text-xs font-extrabold text-black">{resumeData.project.role}</span>
                </div>
                <p className="text-xs font-medium text-black mt-1 whitespace-pre-wrap">{resumeData.project.description || '프로젝트 설명이 없습니다.'}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 text-center text-xs font-bold text-black mt-8">
            JUST Resume Builder ({resumeData.templateType} Template)
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex gap-3 w-[595px] px-2 shrink-0 pb-4">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-white border border-gray-400 hover:bg-gray-100 text-black font-bold text-sm py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            📥 pdf로 저장하기
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(resumeData, null, 2));
              alert('템플릿 데이터가 클립보드에 복사되었습니다!');
            }}
            className="flex-1 bg-black hover:bg-gray-800 text-white font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            📋 템플릿 복사하기
          </button>
        </div>

      </div>
    </main>
  );
}