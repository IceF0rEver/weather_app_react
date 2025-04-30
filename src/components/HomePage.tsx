import { Current } from "./Current";
import { Hourly } from "./Hourly";
import { Daily } from "./Daily";

interface Param{
    onPageShow: () => void,
};

export default function HomePage({onPageShow}: Param) {
    return (
        <div className=" flex flex-col dark:bg-gray-800 bg-gray-300">
        <div className="flex flex-col px-4 gap-4">
            <Current/>
            <Hourly/>
            <Daily/>
            <div className="mx-auto">
                    <button 
                    onClick={onPageShow}
                    className="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-3 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl"
                    >
                        <span className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7v14"></path>
                            </svg>
                        </span>
                    </button>
            </div>
        </div>
    </div>
    )
};