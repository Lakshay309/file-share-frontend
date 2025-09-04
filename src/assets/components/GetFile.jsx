import React, { useState } from "react";

function GetFile() {
  const [code, setCode] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [textLink, setTextLink] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {
    if (code.length !== 6) {
      alert("Code must be exactly 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/request-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const jsondata = await res.json();
      setFileLink(jsondata?.data?.file || "");
      setTextLink(jsondata?.data?.text || "");
    } catch (err) {
      console.error("Error fetching file:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔽 Multiple download strategies to handle CORS
  const handleDownload = async () => {
    if (!fileLink) return;

    // Strategy 1: Try fetch with blob (works on localhost, best UX)
    try {
      console.log("Trying fetch + blob method...");
      const response = await fetch(fileLink);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const filename = fileLink.split("/").pop() || "downloaded_file";
      a.download = filename;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      console.log("Blob download successful!");
      return; // Exit if successful
      
    } catch (fetchError) {
      console.error("Fetch + blob method failed:", fetchError);
      console.log("This is likely a CORS issue. Trying alternative methods...");
    }

    // Strategy 2: Try using your backend as a proxy
    try {
      console.log("Trying backend proxy method...");
      const proxyResponse = await fetch(import.meta.env.VITE_API_URL + "/download-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl: fileLink }),
      });

      if (proxyResponse.ok) {
        const blob = await proxyResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        
        const filename = fileLink.split("/").pop() || "downloaded_file";
        a.download = filename;
        
        document.body.appendChild(a);
        a.click();
        a.remove();
        
        window.URL.revokeObjectURL(url);
        console.log("Proxy download successful!");
        return; // Exit if successful
      }
    } catch (proxyError) {
      console.error("Proxy method failed:", proxyError);
    }

    // Strategy 3: Try direct link with download attribute
    try {
      console.log("Trying direct link method...");
      const a = document.createElement("a");
      a.href = fileLink;
      a.download = fileLink.split("/").pop() || "downloaded_file";
      a.target = "_blank";
      
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      console.log("Direct link download attempted");
      return;
      
    } catch (directError) {
      console.error("Direct link method failed:", directError);
    }

    // Strategy 4: Last resort - open in new tab with instructions
    try {
      window.open(fileLink, '_blank');
      alert('CORS policy is blocking the download. File opened in new tab. Please right-click the link and select "Save As" or "Download".');
    } catch (finalError) {
      console.error("All download methods failed:", finalError);
      alert("Download failed due to CORS restrictions. Please contact support to enable file downloads.");
    }
  };

  return (
    <div className="mt-6 min-h-[50%] p-2 w-full min-w-[400px] flex justify-around flex-col items-center">
      {/* Input field */}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
        className="w-[60%] p-2 border-2 rounded text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 h-[50px]"
      />

      {/* Button (hidden once results are shown) */}
      {!fileLink && !textLink && (
        <button
          onClick={downloadFile}
          disabled={loading}
          className={`w-[60%] m-4 p-2 border-2 rounded text-center h-[50px] text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Fetching..." : "Get File/Text"}
        </button>
      )}

      {/* Results */}
      <div className="w-[80%] text-center mt-4 space-y-4">
        {fileLink && (
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Download File
            </button>
            {/* Debug info - remove in production */}
            <div className="text-xs text-gray-500 break-all">
              File URL: {fileLink}
            </div>
          </div>
        )}

        {textLink && (
          <div className="p-4 border rounded-lg shadow-sm text-left whitespace-pre-wrap max-h-[200px] overflow-y-auto">
            {textLink}
          </div>
        )}
      </div>
    </div>
  );
}

export default GetFile;