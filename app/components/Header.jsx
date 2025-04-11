'use client';
import { useContext, useState } from "react";
import { InsertContext } from './hooks/InsertPost';
import { AuthContext } from "./hooks/AuthProvider";
import Link from "next/link";
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { dataInsert, setDataToInsert } = useContext(InsertContext)
    const { user } = useContext(AuthContext)
    const postText = (e) => {
        const insertion = {
            text: e,
            userId: user?.uid
        }
        setDataToInsert(insertion);
    }

    const handleSubmitQuestion = () => {
        dataInsert('/api/insert');
    }

    return (
        <div className="bg-gray-100 border-b-2 p-2 m-auto text-gray-800 fixed top-0 left-0 right-0 z-10">
            <div className="flex gap-[5rem] w-[70rem] m-auto items-center">
                <div>
                    <h2 className="text-[2rem] font-serif">BDDev</h2>
                </div>
                <div className="flex gap-[3rem] items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" viewBox="0 0 24 24" fill="#616161">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#000" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 22V12H15V22" stroke="#000" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" viewBox="0 0 24 24" fill="#616161">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.74304 6.17102C4.74304 5.44716 5.32985 4.86035 6.05371 4.86035C6.77757 4.86035 7.36438 5.44716 7.36438 6.17102C7.36438 6.89488 6.77757 7.48169 6.05371 7.48169C5.32985 7.48169 4.74304 6.89488 4.74304 6.17102ZM6.05371 3.36035C4.50142 3.36035 3.24304 4.61873 3.24304 6.17102C3.24304 7.72331 4.50142 8.98169 6.05371 8.98169C7.606 8.98169 8.86438 7.72331 8.86438 6.17102C8.86438 4.61873 7.606 3.36035 6.05371 3.36035ZM16.6187 6.17102C16.6187 5.44716 17.2055 4.86035 17.9293 4.86035C18.6532 4.86035 19.24 5.44716 19.24 6.17102C19.24 6.89488 18.6532 7.48169 17.9293 7.48169C17.2055 7.48169 16.6187 6.89488 16.6187 6.17102ZM17.9293 3.36035C16.377 3.36035 15.1187 4.61873 15.1187 6.17102C15.1187 7.72331 16.377 8.98169 17.9293 8.98169C19.4816 8.98169 20.74 7.72331 20.74 6.17102C20.74 4.61873 19.4816 3.36035 17.9293 3.36035ZM11.9917 10.0757C10.7286 10.0757 9.70471 11.0996 9.70471 12.3627C9.70471 13.6258 10.7286 14.6497 11.9917 14.6497C13.2548 14.6497 14.2787 13.6258 14.2787 12.3627C14.2787 11.0996 13.2548 10.0757 11.9917 10.0757ZM8.20471 12.3627C8.20471 10.2712 9.9002 8.57572 11.9917 8.57572C14.0832 8.57572 15.7787 10.2712 15.7787 12.3627C15.7787 13.8398 14.933 15.1194 13.6995 15.7437H14.1327C15.6515 15.7437 16.8827 16.9749 16.8827 18.4937V19.8897C16.8827 20.3039 16.5469 20.6397 16.1327 20.6397C15.7185 20.6397 15.3827 20.3039 15.3827 19.8897V18.4937C15.3827 17.8033 14.8231 17.2437 14.1327 17.2437H9.91284C9.22249 17.2437 8.66284 17.8033 8.66284 18.4937V19.8897C8.66284 20.3039 8.32706 20.6397 7.91284 20.6397C7.49863 20.6397 7.16284 20.3039 7.16284 19.8897V18.4937C7.16284 16.9749 8.39406 15.7437 9.91284 15.7437H10.2839C9.05037 15.1194 8.20471 13.8398 8.20471 12.3627ZM3.96594 10.1375C2.44716 10.1375 1.21594 11.3687 1.21594 12.8875V13.772C1.21594 14.1862 1.55173 14.522 1.96594 14.522C2.38016 14.522 2.71594 14.1862 2.71594 13.772V12.8875C2.71594 12.1971 3.27559 11.6375 3.96594 11.6375H5.83777V10.1375H3.96594ZM22.7841 12.9658C22.7841 11.447 21.5528 10.2158 20.0341 10.2158H17.9473V11.7158H20.0341C20.7244 11.7158 21.2841 12.2754 21.2841 12.9658V13.8503C21.2841 14.2645 21.6198 14.6003 22.0341 14.6003C22.4483 14.6003 22.7841 14.2645 22.7841 13.8503V12.9658Z" fill="#616161" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" viewBox="0 0 25 24" fill="#616161">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.4984 9.25744L14.7444 6.50344L8.77337 12.4774L8.49837 14.9314C8.48941 15.0087 8.49804 15.087 8.52361 15.1605C8.54919 15.234 8.59105 15.3007 8.64607 15.3557C8.70108 15.4108 8.76782 15.4526 8.8413 15.4782C8.91478 15.5038 8.99309 15.5124 9.07037 15.5034L11.5224 15.2304L17.4984 9.25744ZM17.9044 4.80344L19.1954 6.09344L19.1984 6.09744C19.3918 6.29095 19.5004 6.55335 19.5004 6.82694C19.5004 7.10052 19.3918 7.36292 19.1984 7.55644L17.9804 8.77244L15.2304 6.02144L16.4454 4.80344C16.6389 4.61004 16.9013 4.5014 17.1749 4.5014C17.4485 4.5014 17.7108 4.61004 17.9044 4.80344ZM8.95427 16.9044C8.77308 16.6155 8.66615 16.445 8.35437 16.5274C7.78259 16.6767 7.22183 17.2677 6.6361 17.885C6.28757 18.2523 5.93019 18.629 5.55639 18.9274C4.55439 19.7274 17.1794 19.6494 12.8034 18.9274C9.92505 18.4525 9.3025 17.4598 8.95427 16.9044Z" fill="#616161" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" viewBox="0 0 24 24" fill="#616161">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.43311 9.56643C5.43311 5.93928 8.37337 3 11.9995 3C15.6257 3 18.566 5.93928 18.566 9.56643L18.567 10.8848C18.567 11.6651 18.7382 12.4347 19.0709 13.1401L19.537 14.1305C20.2492 15.6444 19.1449 17.3851 17.4714 17.3851H6.52768C4.85421 17.3851 3.74991 15.6444 4.46211 14.1305L4.92815 13.1401C5.25993 12.4347 5.43214 11.6651 5.43214 10.8848L5.43311 9.56643Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.89844 17.9004C8.89844 19.6118 10.2858 21.0002 11.9972 21.0002C13.7096 21.0002 15.097 19.6118 15.097 17.9004" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div >
                        <input className="p-2 w-[22rem] rounded-md" type="text" placeholder="Search" />
                    </div>
                    <div >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 font-semibold border bg-white rounded-lg hover:bg-blue-100 text-gray-900"
                        >
                            Add Question
                        </button>
                    </div>
                    <div >
                        <Link href={'/login'}>
                            <button
                                className="px-4 py-2 font-semibold border bg-white rounded-lg hover:bg-blue-100 text-gray-900"
                            >
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50">
                    {/* Modal Content */}
                    <div className="bg-white rounded-lg  shadow-lg p-6 w-[50rem] transform transition-all scale-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-5">Add Question</h2>
                        <div className="h-[10rem]">
                            <input onChange={(e) => postText(e.target.value)} className="border-b border-gray-300 w-full outline-none p-2" placeholder="Ask anything...." type="text" />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => handleSubmitQuestion()}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;