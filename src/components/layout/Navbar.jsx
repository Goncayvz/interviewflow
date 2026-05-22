function Navbar(){
    return(
        <header className="h-20 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-semibold">
                    Technical Interview Preparation Platform
                </h2>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
                    G
                </div>
            </div>
        </header>
    )
}
export default Navbar;