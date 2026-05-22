import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Question Bank", path: "/question" },
  { name: "Quiz Mode", path: "/quiz" },
  { name: "Mock Interview", path: "/mock-interview" },
  { name: "Progress", path: "/progress" },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 p-5">
      <h1 className="text-2xl font-bold mb-10 text-cyan-400">
        InterviewFlow
      </h1>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition ${
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
