function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-8 mb-4 pt-6 px-4 border-t">
      <ul className="text-sm flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-8 md:space-y-0 ">
        <li>
          <a
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/BlazeIsClone"
          >
            <ArrowIcon />
            <p className="ml-3 h-6">github/blazeisclone</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:sandevabeykoon123@gmail.com"
          >
            <ArrowIcon />
            <p className="ml-3 h-6">sandevabeykoon123@gmail.com</p>
          </a>
        </li>
      </ul>
      <p className="mt-8 text-xs">© {new Date().getFullYear()} GPL-2.0</p>
    </footer>
  );
}
