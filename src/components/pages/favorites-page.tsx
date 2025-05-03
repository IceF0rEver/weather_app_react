export default function FavoritesPage({onPageShow}: {onPageShow: () => void}) {
    return (
        <div>
            <button onClick={onPageShow}
                    className="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-3 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl"
                    >
            </button>
            <div className="mx-auto flex flex-col dark:bg-gray-800 bg-gray-300">
                <div className="flex flex-col px-4 gap-4">
                    {/* <AddFrom/>
                    <FavoriteList/> */}
                </div>
            </div>
        </div>

    )
}