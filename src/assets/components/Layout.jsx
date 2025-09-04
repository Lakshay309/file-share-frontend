import { Outlet } from "react-router";
import { useNavigate } from "react-router";
function Layout() {
    const navigate = useNavigate();
    return (
        <div className="h-[60vh] p-4 w-full my-2 flex items-center justify-center">
            <div className="m-1 max-w-[500px] w-full min-w-[300px] max-h-[800px]border-2 rounded-lg shadow-md bg-[var(--bg)] dark:bg-[var(--bg)]">
                {/* Nav Buttons */}
                <div className="flex justify-center gap-2 p-2">
                    <button 
                    onClick={()=>navigate("/")}
                    className="flex-1 py-4 bg-[var(--primary)] dark:bg-[var(--primary)] rounded-lg text-[var(--text)]">
                        SEND
                    </button>
                    <button 
                    onClick={()=>navigate("/receive")}
                    className="flex-1 py-4 bg-[var(--primary)] dark:bg-[var(--primary)] rounded-lg">
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
