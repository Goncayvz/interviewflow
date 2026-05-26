import ThemePicker from "./ThemePicker";

function Navbar(){
    return(
        <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-4 sm:px-6 lg:h-20">
            <div className="min-w-0">
                <h2 className="text-base font-semibold sm:text-xl">
                    Technical Interview Preparation Platform
                </h2>
            </div>
            <div className="flex shrink-0 items-center gap-3">
                <ThemePicker />

                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
                    G
                </div>
            </div>
        </header>
    )
}
export default Navbar;
