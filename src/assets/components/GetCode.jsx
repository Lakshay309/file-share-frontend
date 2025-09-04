import React, { useEffect, useState } from "react";

function GetCode() {
  const [code, setCode] = useState("");

  useEffect(() => {
    const storedCode = localStorage.getItem("code");
    if (storedCode) {
      setCode(storedCode);
    } else {
      setCode("No code found in localStorage");
    }
  }, []);

  return (
    <div className="flex items-center justify-center  ">
      <div className=" shadow-lg rounded-2xl p-6 w-96 text-center">
        <h1 className="text-xl font-bold mb-4">Your Retrieval Code</h1>
        <p className="text-lg font-mono text-blue-600 border border-blue-300 rounded-lg p-3">
          {code}
        </p>
      </div>
    </div>
  );
}

export default GetCode;
