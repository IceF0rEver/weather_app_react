import { AddFrom } from "../AddFrom";
import { FavoriteList } from "../FavoriteList";

export default function FavoritesPage({onPageShow}: {onPageShow: () => void}) {
    return (
        <div className="mx-auto flex flex-col gap-4 dark:bg-gray-800 bg-gray-300">
            <div className="flex justify-end px-4">
                <button
                    onClick={onPageShow}
                    className="bg-gray-400 hover:bg-gray-500  p-1 rounded-sm focus:shadow-outline flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"className="" width="25" height="25" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20"/></svg>
                </button>
            </div>
            <div className="flex flex-col px-4 gap-4">
                <AddFrom/>
                <FavoriteList/>
            </div>
        </div>
    )
};