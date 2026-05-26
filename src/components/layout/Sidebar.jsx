import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Question Bank", path: "/question" },
  { name: "Tasks", path: "/tasks" },
  { name: "Quiz Mode", path: "/quiz" },
  { name: "Mock Interview", path: "/mock-interview" },
  { name: "Progress", path: "/progress" },
  { name: "Summary", path: "/summary" },
];

function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950 p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-5">
      <h1 className="mb-4 text-xl font-bold text-cyan-400 sm:text-2xl lg:mb-10">
        InterviewFlow
      </h1>
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition sm:px-4 lg:rounded-xl lg:text-base ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
