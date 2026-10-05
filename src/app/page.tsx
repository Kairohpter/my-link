
export default function Home() {
  const sampleLinks = [
    { title: "GitHub 프로필", url: "https://github.com", desc: "소스코드 및 프로젝트 저장소" },
    { title: "개인 블로그", url: "https://velog.io", desc: "기술 아티클과 회고" },
    { title: "포트폴리오", url: "#", desc: "프로젝트 포트폴리오 살펴보기" },
    { title: "인스타그램", url: "https://instagram.com", desc: "일상 및 사진 공유" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900 text-slate-800 dark:text-zinc-100 flex flex-col items-center justify-center p-6">
      <main className="w-full max-w-md flex flex-col items-center text-center space-y-6">
        {/* 프로필 섹션 */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/20">
            ML
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">마이링크 (MyLink)</h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              @mylink · 나만의 링크를 한 곳에서 공유하세요
            </p>
          </div>
        </div>

        {/* 링크 목록 예시 */}
        <div className="w-full flex flex-col gap-3">
          {sampleLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 shadow-sm hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {link.title}
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                {link.desc}
              </span>
            </a>
          ))}
        </div>

        {/* 안내 카드 */}
        <div className="w-full mt-6 p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-left">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            🚀 프로젝트 스캐폴딩 완료
          </h2>
          <ul className="text-xs text-slate-600 dark:text-zinc-300 space-y-1">
            <li>• <strong>Framework:</strong> Next.js (App Router)</li>
            <li>• <strong>Language:</strong> TypeScript</li>
            <li>• <strong>Styling:</strong> Tailwind CSS</li>
            <li>• <strong>경로:</strong> <code className="bg-slate-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">src/app/page.tsx</code>를 수정하여 시작하세요.</li>
          </ul>
        </div>
      </main>

      <footer className="mt-12 text-center text-xs text-slate-400 dark:text-zinc-500">
        © 2026 MyLink. Built with Next.js & TypeScript.
      </footer>
    </div>
  );
}
