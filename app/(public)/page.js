'use client';
import { useContext, useEffect, useState } from "react";
import Addvertisements from "../components/Addvertisements";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { io } from "socket.io-client";
import { InsertContext } from "../components/hooks/InsertPost";
import { AuthContext } from "../components/hooks/AuthProvider";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { fetchApi, fetchedData } = useContext(InsertContext)
  const {user}  = useContext(AuthContext)
  console.log(user?.uid);

  useEffect(() => {
    if(!user?.uid) return;
    setPosts(fetchedData);
    console.log(fetchedData);
    if (!fetchedData || fetchedData.length === 0) {
      fetchApi(`/api/followed-user-posts/${user?.uid}`);
    }

  }, [fetchApi, fetchedData, user?.uid])
console.log(posts, 'new changed api');
  const backendServerUrl = 'http://localhost:3001';

  useEffect(() => {
    const socketInstance = io(backendServerUrl, {
      transports: ['websocket'],
      reconnectionAttempts: 3,
      reconnection: true,
    });

    socketInstance.on("connect", () => {
      console.log("✅ WebSocket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("response", (data) => {
      console.log("📩 Received response from server:", data.data.to);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("❌ Connection error:", err);
      setIsConnected(false);
    });

    // Save the socket instance
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        console.log("⚠️ WebSocket disconnected");
      }
    };
  }, []);

  const send = () => {
    if (socket && isConnected) {
      socket.emit('response', {
        name: 'riad',
        type: 'nonono',
        message: 'head shot',
        to: socket.id
      });
      console.log("📤 Message sent to server");
    } else {
      console.log("❌ Socket is not connected.");
    }
  };

  return (
    <div className="m-auto bg-white h-[2rem]">
      <Header />



      <div className="flex w-[70rem] gap-4 m-auto mt-[5rem]">
        <Sidebar />
        <div className="grid grid-cols-1">
          <div className="bg-gray-100 border w-[40rem] mt-4 mb-4 m-auto p-2 rounded-md">
            <div>
              <div className="border border-gray-900 p-3 rounded-md flex items-center gap-3">
                <div className="border rounded-lg p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" fill="#616161">
                    <path d="M5.89188 17.0826C4.62603 17.0826 3.8611 16.2612 3.80695 15.1172C3.80695 13.8218 4.58692 12.7082 5.93285 12.2278C7.00637 11.8447 8.4399 12.7365 10.125 12.7245C11.8077 12.7405 13.2406 11.85 14.3143 12.231C15.6679 12.7113 16.4505 13.8237 16.4429 15.1172C16.382 16.2612 15.6216 17.0826 14.358 17.0826H5.89188Z" stroke="#000" stroke-width="1.2" stroke-miterlimit="10" />
                    <path d="M10.1316 9.69027C12.0021 9.69027 13.5184 8.17398 13.5184 6.3035C13.5184 4.43301 12.0021 2.91669 10.1316 2.91669C8.26114 2.91669 6.74481 4.43301 6.74481 6.3035C6.74481 8.17398 8.26114 9.69027 10.1316 9.69027Z" stroke="#000" stroke-width="1.2" stroke-miterlimit="10" />
                  </svg>
                </div>
                <h2>What{`'`}s on your mind?</h2>
              </div>
            </div>
            <div className="flex justify-between mt-4 border-gray-600 p-2">
              <button className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#616161">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1532 5.40242C12.4236 4.99063 13.2943 5.42104 13.6334 5.75087C14.0395 6.14576 14.4844 7.00478 14.4844 7.83421C14.4844 8.16765 14.3446 8.56401 14.0996 8.97435C13.8598 9.37594 13.557 9.72748 13.3254 9.95271C13.1566 10.1169 12.9346 10.271 12.6532 10.4664C12.5783 10.5184 12.4992 10.5733 12.4157 10.6322C12.081 10.8682 11.6181 11.2052 11.3563 11.643C11.0509 12.1538 10.898 12.7919 10.8162 13.3159C10.7319 13.8555 10.711 14.3574 10.711 14.6489C10.711 15.0631 11.0468 15.3989 11.461 15.3989C11.8752 15.3989 12.211 15.0631 12.211 14.6489C12.211 14.4163 12.2285 13.994 12.2982 13.5474C12.3704 13.0851 12.4871 12.6747 12.6438 12.4128C12.7177 12.2891 12.9094 12.1195 13.28 11.8582C13.3349 11.8195 13.3944 11.7783 13.4571 11.735L13.4572 11.7349L13.4573 11.7349C13.7471 11.5346 14.1037 11.2881 14.3711 11.0281C14.6786 10.7291 15.0689 10.2768 15.3874 9.74342C15.7007 9.21883 15.9844 8.5492 15.9844 7.83421C15.9844 6.56681 15.3512 5.32902 14.6792 4.67549C13.9402 3.9569 12.4887 3.39269 10.6906 3.97552C9.61121 4.32541 8.94399 5.18348 8.55787 6.00953C8.17165 6.8358 8.01562 7.73135 8.01562 8.35842C8.01562 8.77264 8.35141 9.10842 8.76562 9.10842C9.17984 9.10842 9.51562 8.77264 9.51562 8.35842C9.51562 7.93708 9.62914 7.26001 9.91675 6.64471C10.2045 6.0292 10.6154 5.57675 11.1532 5.40242ZM11.6 20.2663C12.2075 20.2663 12.7 19.7738 12.7 19.1663C12.7 18.5588 12.2075 18.0663 11.6 18.0663C10.9925 18.0663 10.5 18.5588 10.5 19.1663C10.5 19.7738 10.9925 20.2663 11.6 20.2663Z" fill="#616161" />
                </svg>
                Ask
              </button>|
              <button className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 24" fill="#616161">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.70098 18.6489L7.86675 18.5493L7.94697 18.5506C8.21647 18.5039 8.45766 18.3552 8.62055 18.1355L15.8593 9.79125L14.2495 8.33354L7.15694 16.5094C6.98893 16.6968 6.8712 16.9239 6.81475 17.1692L6.80598 17.2144L6.79873 17.2517C6.79472 17.2723 6.79071 17.2929 6.79475 17.314L6.79156 17.3776L6.70098 18.6489ZM15.2876 7.13696L16.8973 8.59466L18.0734 7.239C18.1899 7.11987 18.2813 6.97858 18.3423 6.8235C18.4032 6.66841 18.4324 6.50268 18.4282 6.33611L17.2451 5.20051C16.9932 5.26306 16.7695 5.40824 16.6098 5.61285L15.2876 7.13696ZM5.20944 17.2626L4.98746 20.3856L7.93043 20.1346C8.29594 20.1193 8.65397 20.0261 8.9805 19.8612C9.30703 19.6962 9.59452 19.4634 9.82369 19.1782L19.2765 8.28172C19.691 7.89735 19.9495 7.37378 20.0025 6.81098C20.0555 6.24817 19.8994 5.68555 19.564 5.23052L18.2761 3.99507C17.5662 3.31308 16.284 3.57321 15.4101 4.56775L5.95732 15.4643C5.60942 15.8584 5.36868 16.3353 5.25819 16.8493L5.24063 16.8296L5.22292 17.0727C5.21595 17.1365 5.21145 17.1998 5.20944 17.2626Z" fill="#616161" />
                </svg>
                Answer
              </button>|
              <button className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 24" fill="#616161">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4984 9.25744L14.7444 6.50344L8.77337 12.4774L8.49837 14.9314C8.48941 15.0087 8.49804 15.087 8.52361 15.1605C8.54919 15.234 8.59105 15.3007 8.64607 15.3557C8.70108 15.4108 8.76782 15.4526 8.8413 15.4782C8.91478 15.5038 8.99309 15.5124 9.07037 15.5034L11.5224 15.2304L17.4984 9.25744ZM17.9044 4.80344L19.1954 6.09344L19.1984 6.09744C19.3918 6.29095 19.5004 6.55335 19.5004 6.82694C19.5004 7.10052 19.3918 7.36292 19.1984 7.55644L17.9804 8.77244L15.2304 6.02144L16.4454 4.80344C16.6389 4.61004 16.9013 4.5014 17.1749 4.5014C17.4485 4.5014 17.7108 4.61004 17.9044 4.80344ZM8.95427 16.9044C8.77308 16.6155 8.66615 16.445 8.35437 16.5274C7.78259 16.6767 7.22183 17.2677 6.6361 17.885C6.28757 18.2523 5.93019 18.629 5.55639 18.9274C4.55439 19.7274 17.1794 19.6494 12.8034 18.9274C9.92505 18.4525 9.3025 17.4598 8.95427 16.9044Z" fill="#616161" />
                </svg>
                Post
              </button>
            </div>
          </div>
          {posts?.map((post, i) => (
            <Posts key={i} post={post} />
          ))}
        </div>

        <Addvertisements />
      </div>
      <button onClick={send}>Send</button>
    </div>
  );
}
