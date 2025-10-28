import { useEffect, useState, useRef } from "react";
import NavbarUser from "../components/NavbarUser";
import { db, auth } from "../db/firebase";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  doc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

export default function CommunityChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [gamertag, setGamertag] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Ambil pesan realtime
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Ambil gamertag user dari Firestore
  useEffect(() => {
    const getUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setGamertag(snap.data().gamertag);
      } else {
        setGamertag("Steve");
      }
    };

    getUserData();
  }, []);

  // Scroll otomatis ke bawah tiap pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [input]);

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loadingSend) return;

    setLoadingSend(true);
    const user = auth.currentUser;

    try {
      await addDoc(collection(db, "messages"), {
        text: input,
        sender: gamertag || "Steve",
        senderId: user?.uid || "unknown",
        createdAt: serverTimestamp(),
      });

      // Delay kecil biar efek kirim lebih natural
      await new Promise((res) => setTimeout(res, 400));
      setInput("");
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    } finally {
      setLoadingSend(false);
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0b0c10] text-white">
        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[#45a29e]/50 scrollbar-track-transparent">
          {messages.map((msg) => {
            const isOwnMessage = msg.sender === gamertag;
            return (
              <div
                key={msg.id}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                } whitespace-pre`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl shadow-md ${
                    isOwnMessage
                      ? "bg-[#45a29e] text-[#0b0c10] rounded-br-none"
                      : "bg-[#1f2833] text-[#c5c6c7] rounded-bl-none"
                  }`}
                >
                  {!isOwnMessage && (
                    <span className="block text-[#66fcf1] text-sm font-semibold mb-1 ">
                      {msg.sender}
                    </span>
                  )}
                  <p className="break-words">{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Chat */}
        <form
          onSubmit={sendMessage}
          className="flex items-end p-3 bg-[#1f2833] border-t border-[#45a29e]/30"
        >
          <textarea
            ref={textareaRef}
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none p-2 rounded-xl bg-[#0b0c10] border border-[#45a29e]/30 text-white placeholder-[#c5c6c7]/50 outline-none mr-2 overflow-hidden"
            placeholder={loadingSend ? "Mengirim..." : "Ketik pesan..."}
            disabled={loadingSend}
          />
          <button
            type="submit"
            disabled={loadingSend}
            className={`${
              loadingSend
                ? "bg-[#45a29e]/60 cursor-not-allowed"
                : "bg-[#45a29e] hover:bg-[#66fcf1]"
            } text-[#0b0c10] font-semibold px-4 py-2 rounded-xl transition`}
          >
            {loadingSend ? "..." : "Kirim"}
          </button>
        </form>
      </div>
    </>
  );
}
