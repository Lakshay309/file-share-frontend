
import { useState } from "react";
import { useNavigate } from "react-router";

function Input() {
    const navigate=useNavigate()
    const [text,setText]=useState("");
    const [file,setFile]=useState(null);
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const handleUpload=async()=>{
        if(!file && text.length==0){
            alert("Please select a file or enter text first!");
            return;
        }
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
        }
    };

    return (
        <div className="grid grid-cols-2 gap-2 mt-6 h-[100%] p-2 ">
            {/* Text input */}
            <input
                type="file"
                onChange={(e)=>setFile(e.target.files[0])}
                className="col-span-1 h-[80%] border-2 rounded p-2 file:hidden"
            />

            {/* File input */}
            <textarea
                className="col-span-1 h-[80%] border-2 rounded p-2 resize-none"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder="Enter text"
            ></textarea>

            {/* Upload button */}
            <button 
            onClick={handleUpload}
            className="col-span-2 h-12 w-[75%] bg-blue-600 text-white rounded mt-2 mx-auto">
                Upload
            </button>
        </div>
    );
}

export default Input;
