
import { useState } from "react";
import { useNavigate } from "react-router";


function Input() {
    const navigate=useNavigate()
    const [text,setText]=useState("");
    const [file,setFile]=useState(null);
    const [loading, setLoading] = useState(false);

    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const handleUpload=async()=>{
        if(!file && text.length==0){
            alert("Please select a file or enter text first!");
            return;
        }
        setLoading(true);
        const formData=new FormData();
        formData.append("uploadedFile",file);
        formData.append("content",text);

        try{
            const res=await fetch(`${VITE_API_URL}/file`,{
                method:"POST",
                body:formData,
            });
            const data=await res.json();
            localStorage.setItem("code",data.data.code);
            navigate("/get-code");
        }
        catch(err){
            console.log("upload failed: ",err)
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-2 mt-6 h-[100%] p-2 ">
            {/* Text input */}
            <input
                type="file"
                onChange={(e)=>setFile(e.target.files[0])}
                className="col-span-1 h-[80%] border-1 rounded-lg p-2 py-4 file:hidden"
            />

            {/* File input */}
            <textarea
                className="col-span-1 h-[80%] border-1 rounded-lg p-2 py-4 resize-none"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder=" Enter text"
            ></textarea>

            {/* Upload button */}
            <button 
            onClick={handleUpload}
            className={`col-span-2 h-12 w-[75%] bg-[var(--secondary)] dark:bg-[var(--secondary)] rounded-lg mt-2 mx-auto border-1  ${loading ? "bg-gray-400" : "bg-[var(--secondary)] dark:bg-[var(--secondary)] text-white"}`}>
                {!loading?"Upload":"uploading"}
            </button>
        </div>
    );
}

export default Input;
