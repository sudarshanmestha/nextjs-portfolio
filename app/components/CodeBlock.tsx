export default function CodeBlock({ children }: { children: React.ReactNode }) {
    return (
      <pre className="bg-zinc-900 text-cyan-300 p-6 rounded-xl overflow-x-auto border border-zinc-700 my-6 font-mono text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    )
  }