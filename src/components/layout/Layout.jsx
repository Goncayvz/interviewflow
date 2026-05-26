import {Outlet} from 'react-router-dom';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout(){
    return (
        <div className="flex min-h-screen flex-col bg-slate-900 text-slate-100 lg:flex-row">
            <Sidebar/>
            <div className="flex min-w-0 flex-1 flex-col">
                <Navbar/>
                <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default Layout;
