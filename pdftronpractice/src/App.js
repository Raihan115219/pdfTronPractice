import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";

function App() {
  const viewer = useRef(null); // Reference to the div for WebViewer

  useEffect(() => {
    // Prevent multiple instances of WebViewer from being initialized
    if (viewer.current && !viewer.current.webViewerInstance) {
      WebViewer(
        {
          path: "/lib", // path to WebViewer lib files
          initialDoc:
            "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
        },
        viewer.current
      ).then((instance) => {
        // Store instance inside the ref to avoid re-initialization
        viewer.current.webViewerInstance = instance;

        const { documentViewer } = instance.Core;
        instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);

        console.log("WebViewer instance initialized", instance);
      });
    }

    // Cleanup: Remove WebViewer instance if component is unmounted
    return () => {
      if (viewer.current && viewer.current.webViewerInstance) {
        console.log("Cleaning up WebViewer instance");
        viewer.current.webViewerInstance = null;
      }
    };
  }, []);

  return (
    <div className="MyComponent">
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
}

export default App;
