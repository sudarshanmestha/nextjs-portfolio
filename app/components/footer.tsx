function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="
      bg-black
      border-t border-zinc-800
      mt-0.2  
      py-12
    ">
      <div className="max-w-6xl mx-auto px-6">

        <ul className="
          flex flex-col md:flex-row
          justify-center
          gap-6
          text-sm
          text-zinc-400
        ">
          {[
            { label: 'RSS', href: '/' },
            { label: 'GitHub', href: '/' },
            { label: 'View Source', href: '/' },
          ].map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex items-center
                  gap-2
                  hover:text-[#39FF14]
                  transition-all duration-300
                "
              >
                <ArrowIcon />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 w-full h-px bg-zinc-800" />

        <p className="
          mt-6
          text-center
          text-xs
          tracking-wide
          text-zinc-500
        ">
          © {new Date().getFullYear()} — MIT Licensed · Built with ❤️ by Sudarshan Mestha
        </p>

      </div>
    </footer>
  )
}