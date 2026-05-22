import {Outlet} from 'react-router-dom';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout(){
    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100">
            <Sidebar/>
            <div className=" flex-1 flex flex-col">
                <Navbar/>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default Layout;