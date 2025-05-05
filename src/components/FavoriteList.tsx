import { useState, useSyncExternalStore, useContext } from "react";
import { LocalStorageData } from "@/types/localStorage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ActiveCityContext, ActivePageContext } from "@/App";

export function FavoriteList() {
    const { setActiveCity } = useContext(ActiveCityContext)!;
    const { setActivePage } = useContext(ActivePageContext)!;

    const [dataLocalStorage, setdataLocalStorage] = useState<LocalStorageData | {id: number, activeStatus: boolean}>();
    
    let lastSnapshot: LocalStorageData[] = []
    let lastRaw: string | null = null

    const store = {
        getSnapshot: (): LocalStorageData[] => {
            const raw = localStorage.getItem("cities")

            if (raw === lastRaw) {
            return lastSnapshot
            }

            lastRaw = raw
            lastSnapshot = raw ? JSON.parse(raw) : []

            return lastSnapshot
        },
        
        subscribe: (listener: () => void) => {
            window.addEventListener("storage", listener)
            return () => window.removeEventListener("storage", listener)
        },
    }
    const cities = useSyncExternalStore(store.subscribe, store.getSnapshot)

    const handleIsActive = (data: LocalStorageData) => {
        setActivePage('home')        
        setActiveCity(data);
    };

    const handleDelete = (data: LocalStorageData) => {
        setdataLocalStorage(data);
    };

    useLocalStorage({
        action: 'remove',
        key: 'cities',
        data: dataLocalStorage,
    });

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 flex flex-col">
                <h2 className="font-bold text-xl mb-4 dark:text-gray-50">Vos lieux favoris</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                { cities && cities.map(item =>
                    <div key={item.id} className="bg-white hover:bg-blue-500 hover:text-white shadow rounded-lg p-1 flex justify-between items-center">                       
                        <button
                            onClick={() => handleIsActive(item)}
                            className="text-left" 
                        >
                            { item.city }, { item.country }
                        </button>
                        <div>
                        <button
                            onClick={() => handleDelete(item)}
                            className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-sm focus:shadow-outline flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"className="text-white" width="25" height="25" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20"/></svg>
                        </button>
                        </div>
                    </div>
                )}
                </div>
            </section>
        </div>
    )
};