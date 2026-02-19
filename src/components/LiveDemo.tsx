import React, { useRef, useEffect, useState } from "react";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { speakWord } from "../utils/textToSpeech";
import { Settings, Plus, Trash2, X } from "lucide-react";

// --- Default phrases (if local storage is empty) ---
const INITIAL_PHRASES = [
  "Hello",
  "Goodbye",
  "Yes",
  "No",
  "Thank You",
  "I need help",
  "I'm hungry",
  "I'm thirsty",
  "Where is the bathroom?",
  "I love this!",
];

// --- Main Component ---
interface LiveDemoProps {
  onClose: () => void;
}

const LiveDemo: React.FC<LiveDemoProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- State ---
  const [liveGesture, setLiveGesture] = useState<string>("Detecting...");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  // --- New State for Editing ---
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPhrase, setNewPhrase] = useState<string>("");
  const [phrases, setPhrases] = useState<string[]>(() => {
    const savedPhrases = localStorage.getItem("customPhrases");
    return savedPhrases ? JSON.parse(savedPhrases) : INITIAL_PHRASES;
  });

  // --- Refs ---
  const selectedIndexRef = useRef<number>(selectedIndex);
  const cooldownRef = useRef<boolean>(false);
  const gestureRecognizer = useRef<GestureRecognizer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const drawingUtils = useRef<DrawingUtils | null>(null);
  const isEditingRef = useRef<boolean>(isEditing);
  const selectedPhraseRef = useRef<HTMLDivElement>(null);

  // --- Save phrases to local storage when they change ---
  useEffect(() => {
    localStorage.setItem("customPhrases", JSON.stringify(phrases));
  }, [phrases]);

  // --- Sync state to refs for use in loops ---
  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  // --- Auto-scroll to selected phrase ---
  useEffect(() => {
    if (selectedPhraseRef.current) {
      selectedPhraseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIndex, isEditing]);

  // --- Gesture & Camera Setup (useEffect) ---
  useEffect(() => {
    const createGestureRecognizer = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        gestureRecognizer.current =
          await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: "/gesture_recognizer.task",
              delegate: "CPU",
            },
            runningMode: "VIDEO",
            numHands: 1,
            minHandDetectionConfidence: 0.3,
            minHandPresenceConfidence: 0.3,
            minTrackingConfidence: 0.3,
          });

        const canvas = canvasRef.current;
        if (canvas) {
          const canvasCtx = canvas.getContext("2d");
          if (canvasCtx) {
            drawingUtils.current = new DrawingUtils(canvasCtx);
          }
        }
        await setupCamera();
      } catch (err) {
        console.error("Error loading model or camera:", err);
      }
    };

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsLoading(false);
            predictWebcam();
          };
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    const predictWebcam = () => {
      if (isEditingRef.current) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || !gestureRecognizer.current || !drawingUtils.current) {
        return;
      }
      if (video.readyState < 3) {
        animationFrameId.current = requestAnimationFrame(predictWebcam);
        return;
      }
      const canvasCtx = canvas.getContext("2d");
      if (!canvasCtx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const results = gestureRecognizer.current.recognizeForVideo(video, Date.now());

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.translate(canvas.width, 0);
      canvasCtx.scale(-1, 1);
      canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);

      let gesture = "No Gesture";
      if (results.gestures.length > 0 && results.gestures[0].length > 0) {
        const category = results.gestures[0][0];
        gesture = category.categoryName;
        for (const landmarks of results.landmarks) {
          drawingUtils.current.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
          drawingUtils.current.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 5 });
        }
      }
      canvasCtx.restore();
      setLiveGesture(gesture);

      if (cooldownRef.current) {
        animationFrameId.current = requestAnimationFrame(predictWebcam);
        return;
      }

      let actionTaken = false;
      switch (gesture) {
        case "Pointing_Up":
          setSelectedIndex((prev) => (prev + 1) % phrases.length);
          actionTaken = true;
          break;
        case "Victory":
          setSelectedIndex((prev) => (prev - 1 + phrases.length) % phrases.length);
          actionTaken = true;
          break;
        case "Thumb_Up":
          speakWord(phrases[selectedIndexRef.current]);
          actionTaken = true;
          break;
        case "Open_Palm":
          setSelectedIndex(0);
          actionTaken = true;
          break;
      }

      if (actionTaken) {
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, 700);
      }

      animationFrameId.current = requestAnimationFrame(predictWebcam);
    };

    if (!isEditing) {
      createGestureRecognizer();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
      if (gestureRecognizer.current) {
        gestureRecognizer.current.close();
      }
    };
  }, [isEditing, phrases]); // Re-run when phrases list changes

  // --- Handlers for adding/deleting phrases ---
  const handleAddNewPhrase = () => {
    if (newPhrase.trim() !== "") {
      setPhrases([...phrases, newPhrase.trim()]);
      setNewPhrase("");
    }
  };

  const handleDeletePhrase = (indexToDelete: number) => {
    setPhrases(phrases.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* --- Close and Settings Buttons --- */}
        <button onClick={onClose} style={closeButtonStyle}>
          <X size={30} />
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={settingsButtonStyle}
        >
          <Settings size={24} />
        </button>

        {/* --- Conditional UI: Editing or Gestures --- */}
        {isEditing ? (
          // --- EDITING MODE UI ---
          <div style={editModeStyle}>
            <h2 style={{ color: "white", marginBottom: "20px" }}>
              Customize Phrases
            </h2>
            <div style={addPhraseFormStyle}>
              <input
                type="text"
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                placeholder="Type new phrase..."
                style={inputStyle}
              />
              <button onClick={handleAddNewPhrase} style={addButtonStyle}>
                <Plus size={20} />
              </button>
            </div>
            <div style={phraseListStyle}>
              {phrases.map((phrase, index) => (
                <div key={index} style={phraseEditItemStyle}>
                  <span>{phrase}</span>
                  <button
                    onClick={() => handleDeletePhrase(index)}
                    style={deleteButtonStyle}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // --- GESTURE MODE UI (New Sidebar Layout) ---
          <>
            <p style={liveGestureStyle}>Detecting: {liveGesture}</p>
            {/* --- 1. NEW: Main container for sidebar layout --- */}
            <div style={gestureModeContainerStyle}>
              {/* --- 2. NEW: Sidebar (Left) --- */}
              <div style={sidebarStyle}>
                <div style={phraseListStyle}>
                  {phrases.map((phrase, index) => (
                    <div
                      key={phrase}
                      ref={index === selectedIndex ? selectedPhraseRef : null}
                      style={
                        index === selectedIndex ? selectedPhraseStyle : phraseStyle
                      }
                    >
                      {phrase}
                    </div>
                  ))}
                </div>
                <p style={instructionsStyle}>
                   Point Up : Next |  Peace : Back |  Thumbs Up : Speak
                </p>
              </div>
              
              {/* --- 3. NEW: Main Content (Right) --- */}
              <div style={mainContentStyle}>
                {isLoading && <p style={loadingStyle}>Loading Model & Camera...</p>}
                <video ref={videoRef} style={videoStyle} playsInline />
                <canvas ref={canvasRef} style={canvasStyle} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.9)", display: "flex",
  justifyContent: "center", alignItems: "center", zIndex: 1000,
};
const modalStyle: React.CSSProperties = {
  position: "relative", background: "#222", border: "1px solid #444",
  borderRadius: "10px", padding: "20px", width: "90vw",
  maxWidth: "900px", // --- WIDER MODAL ---
  maxHeight: "90vh",
  display: "flex", flexDirection: "column",
};
const closeButtonStyle: React.CSSProperties = {
  position: "absolute", top: "15px", right: "20px", background: "none",
  border: "none", color: "white", cursor: "pointer", zIndex: 1002,
};
const settingsButtonStyle: React.CSSProperties = {
  position: "absolute", top: "15px", left: "20px", background: "none",
  border: "none", color: "white", cursor: "pointer", zIndex: 1002,
};
const liveGestureStyle: React.CSSProperties = {
  color: "#999", fontSize: "1rem", margin: 0,
  position: "absolute", top: "60px", left: "20px", zIndex: 10,
};

// --- NEW: Styles for Sidebar Layout ---
const gestureModeContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  marginTop: "40px", // Pushed down to make room for 'Detecting' text
};
const sidebarStyle: React.CSSProperties = {
  flex: 1, // Takes up 1 part
  minWidth: "300px", // Don't let it get too small
  display: "flex",
  flexDirection: "column",
};
const mainContentStyle: React.CSSProperties = {
  flex: 1.5, // Takes up 1.5 parts (wider than sidebar)
  position: "relative",
};
// --- End New Styles ---

const phraseListStyle: React.CSSProperties = {
  margin: "0 0 10px 0", // No top margin
  padding: "10px", background: "#111",
  border: "1px solid #555", borderRadius: "8px",
  maxHeight: "400px", // Taller scroll list
  overflowY: "auto",
  textAlign: "left",
  flexGrow: 1, // Allow list to grow
};
const phraseStyle: React.CSSProperties = {
  color: "#888", fontSize: "1.5rem", padding: "10px",
  margin: "5px", borderRadius: "5px",
  transition: "all 0.2s ease-in-out",
};
const selectedPhraseStyle: React.CSSProperties = {
  ...phraseStyle,
  color: "#00FFFF", background: "#005555",
  fontSize: "2rem", fontWeight: "bold",
};
const instructionsStyle: React.CSSProperties = {
  color: "#999", fontSize: "0.9rem", margin: "10px 0 0 0",
  textAlign: "center",
};
const loadingStyle: React.CSSProperties = {
  color: "white", textAlign: "center", fontSize: "1.2rem",
  position: "absolute", top: "50%", left: "50%",
  transform: "translate(-50%, -50%)",
};
const videoStyle: React.CSSProperties = {
  display: "none",
};
const canvasStyle: React.CSSProperties = {
  width: "100%", height: "auto", borderRadius: "8px",
};

// --- Styles for Edit Mode ---
const editModeStyle: React.CSSProperties = {
  paddingTop: "40px",
};
const addPhraseFormStyle: React.CSSProperties = {
  display: "flex", gap: "10px", marginBottom: "20px",
};
const inputStyle: React.CSSProperties = {
  flexGrow: 1, background: "#333", border: "1px solid #555",
  color: "white", padding: "10px", borderRadius: "5px",
  fontSize: "1rem",
};
const addButtonStyle: React.CSSProperties = {
  background: "#00FFFF", color: "#000", border: "none",
  padding: "10px", borderRadius: "5px", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};
const phraseEditItemStyle: React.CSSProperties = {
  ...phraseStyle,
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const deleteButtonStyle: React.CSSProperties = {
  background: "none", border: "none", color: "#FF4136",
  cursor: "pointer", padding: "5px",
};

export default LiveDemo;