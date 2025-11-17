export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <section className="text-center max-w-2xl mt-20">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome to PrepAI
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your personal AI-powered mock interview coach. 
          Practice interviews, improve confidence, and get job-ready faster.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="/signup"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Create Account
          </a>
        </div>
      </section>
      <section className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl">        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-blue-600">
            🤖 AI-Powered Interviews
          </h3>
          <p className="text-gray-600 mt-2">
            Prep_AI generates smart interview questions tailored to your job role.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-blue-600">
            🎤 Speak or Type Answers
          </h3>
          <p className="text-gray-600 mt-2">
            Respond using voice or text — Prep_AI mimics real interview dynamics.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-blue-600">
            📈 Instant Improvement Feedback
          </h3>
          <p className="text-gray-600 mt-2">
            Get AI-generated analysis on tone, content, clarity & structure.
          </p>
        </div>
      </section>
      <p className="mt-20 text-gray-500 text-sm">
        Prep_AI — Practice smarter. Perform better.
      </p>
    </main>
  );
}
