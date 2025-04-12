import { useContext } from "react";
import { InsertContext } from "./hooks/InsertPost";

const Posts = ({ post }) => {
    const { dataInsert } = useContext(InsertContext)
    const { title, body, date, question, userId, userName, id } = post || {};
    const handleFollow = async (userId) => {
        console.log(userId);
        if (!userId) {
            console.log('userId is not defined');
            return;
        }

        await dataInsert(`/api/follow-user/${userId}`);
    }

    const handleInterAction = async (id, userId, type) => {
        console.log(id, userId, type);
        await dataInsert(`/api/react-post/${type}/${id}/${userId}`)
        console.log('check!');
    }
    return (
        <div className="w-[40rem] ">
            <div className="mb-3 rounded-3  bg-gray-50 border p-4 rounded-md">
                <div className="flex justify-between items-center mb-11">
                    {/* Profile Section */}
                    <div>
                        <div className="flex gap-2 items-center justify-between">
                            <div className="flex items-center gap-3 ">
                                <h2 className="bg-black rounded-lg h-[3rem] w-[3rem] text-white flex items-center justify-center">PIC</h2>
                                <div>
                                    <h2 className="text-[1.3rem]">{userName}</h2>
                                    <h2 className="text-[1.1rem]">{date}</h2>
                                    <h2 onClick={() => handleFollow(userId)} className="text-[1.1rem]">Follow</h2>

                                </div>
                            </div>

                            {/* SVG Icon (Aligned to Right) */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="50"
                                viewBox="0 0 20 20"
                                fill="#616161"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.0119 9.8335L15.4227 5.42271C15.7485 5.09687 15.7485 4.57021 15.4227 4.24437C15.0969 3.91854 14.5702 3.91854 14.2444 4.24437L9.83353 8.65517L5.42271 4.24437C5.09687 3.91854 4.57021 3.91854 4.24437 4.24437C3.91854 4.57021 3.91854 5.09687 4.24437 5.42271L8.6552 9.8335L4.24437 14.2444C3.91854 14.5702 3.91854 15.0968 4.24437 15.4227C4.40687 15.5852 4.62021 15.6668 4.83354 15.6668C5.04687 15.6668 5.26021 15.5852 5.42271 15.4227L9.83353 11.0119L14.2444 15.4227C14.4069 15.5852 14.6202 15.6668 14.8335 15.6668C15.0469 15.6668 15.2602 15.5852 15.4227 15.4227C15.7485 15.0968 15.7485 14.5702 15.4227 14.2444L11.0119 9.8335Z"
                                    fill="#616161"
                                />
                            </svg>
                        </div>

                        <h2 className="text-[1.3rem] text-bold">{question}</h2>
                        <p>{question}</p>
                    </div>


                </div>
                <div className="p-3 rounded-md">
                    <div className="flex gap-3">
                        <div className="flex gap-2 items-center border p-2 rounded-lg">
                            <button onClick={() => handleInterAction(id, userId, 'like')} className="flex gap-2 p">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 21 20" fill="#616161">
                                    <path d="M4.66536 12.918L10.4987 7.08464L16.332 12.918" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Upvote
                            </button>
                            <span>|</span>
                            <button className=" rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 24 24" fill="#616161">
                                    <path d="M6 9L12 15L18 9" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <button className="border p-2 rounded-lg">C</button>

                    </div>
                </div>
            </div>




        </div>
    );
};

export default Posts;
