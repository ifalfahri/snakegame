function App() {

  return ( // you can delete it and replace with your own code
    <main className="flex flex-col justify-center items-center min-h-screen space-y-10"> 
      <h1 className="text-5xl font-extrabold text-center">
        <a href="https://react.dev/" className="text-[#61dbfb] hover:text-[#56c8e5] transition-colors">
          React
        </a> + <a href="https://www.typescriptlang.org/" className="text-[#3178c6] hover:text-[#396fa8] transition-colors">
          Typescript
        </a> + <a href="https://tailwindcss.com/" className="text-sky-400 hover:text-sky-500 transition-colors">
          TailwindCSS
        </a> + <a href="https://vite.dev/" className="text-violet-500 hover:text-violet-600 transition-colors">
          Vite
        </a> starter
      </h1>
      <div className="flex flex-row space-x-6">
      <a 
        href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fifalfahri%2Freact-ts-tailwind-starter">
        <img 
          src="https://vercel.com/button" 
          alt="Deploy with Vercel"
          className="h-10 hover:shadow-lg transition-all duration-300"
        />
      </a>
      <a
        href="https://github.com/ifalfahri/react-ts-tailwind-starter"
        target="_blank"
        className="bg-zinc-900 text-white py-2 px-4 rounded-lg hover:bg-black hover:shadow-lg transition-all duration-300"
      >
        ⭐️ on GitHub
      </a>
      </div>
    </main>
  )
}

export default App
