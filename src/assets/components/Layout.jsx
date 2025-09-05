import { useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

function Layout() {
    const navigate = useNavigate();
    const [currentstate,setCurrentstate]=useState(true);
    const sendClick=()=>{
        setCurrentstate(true);
        navigate("/");
    }
    const recieveClick=()=>{
        setCurrentstate(false);
        navigate("/receive");
    }
    return (
        <div className="h-[60vh] p-4 w-full my-2 flex items-center justify-center">
            <div className="m-1 max-w-[500px] w-full min-w-[300px] max-h-[800px]  rounded-lg shadow-md bg-[var(--bg)] dark:bg-[var(--bg)]">
                {/* Nav Buttons */}
                <div className="flex justify-center gap-2 p-2">
                    <button 
                    onClick={()=>sendClick()}
                    className={`flex-1 py-3 ${currentstate?`bg-[var(--primary)] dark:bg-[var(--primary)] text-white`:`border-1`} rounded-lg text-[var(--text)]`}>
                        SEND 
                    </button>
                    <button 
                    onClick={()=>recieveClick()}
                    className={`flex-1 py-3 ${!currentstate?`bg-[var(--primary)] dark:bg-[var(--primary)] text-white`:`border-1`} rounded-lg text-[var(--text)]`}>
                        RECEIVE
                    </button>
                </div>

                {/* Page Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
