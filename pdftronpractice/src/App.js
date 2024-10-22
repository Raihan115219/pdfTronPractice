import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";

function App() {
  const viewer = useRef(null);
  useEffect(() => {
    if (viewer.current && !viewer.current.webViewerInstance) {
      WebViewer(
        {
          path: "/lib",
          initialDoc:
            "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
        },
        viewer.current
      ).then((instance) => {
        viewer.current.webViewerInstance = instance;

        const { documentViewer } = instance.Core;
        instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);

        console.log("WebViewer instance initialized", instance);
      });
    }

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
