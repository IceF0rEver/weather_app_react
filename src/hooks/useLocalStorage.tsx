import { LocalStorageData } from '@/types/localStorage'
import { useEffect, useState } from 'react'

interface Params {
	action: 'add' | 'remove' | 'read'
	key: string
	data?: any
}

export function useLocalStorage({ action, key, data }: Params) {
	const [datas, setDatas] = useState<LocalStorageData[] | null>(null)

	const dispatchStorageEvent = (key: string, newValue: string | null) => {
		window.dispatchEvent(
			new StorageEvent('storage', {
				key,
				newValue,
			})
		)
	}

	useEffect(() => {
		if (!key) return;

		switch (action) {
			case 'add': {
				let updated: LocalStorageData[] = [];

				const existing = localStorage.getItem(key);
				const parsed = existing ? JSON.parse(existing) : [];

				if (data !== undefined) {
					if (!existing) {
						updated = [data];
					} else if (key === 'current') {
						updated = [data];
					} else if (!parsed.some((item: LocalStorageData) => item.id === data.id)) {
						updated = [...parsed, data];
					} else {
						// item déjà présent, on ne modifie rien
						return;
					};

					const json = JSON.stringify(updated);
					localStorage.setItem(key, json);
					dispatchStorageEvent(key, json);
				};
				break;
			};

			case 'remove': {
				const existing = localStorage.getItem(key);
				const parsed = existing ? JSON.parse(existing) : [];

				if (data !== undefined) {
					const updated = parsed.filter((item: LocalStorageData) => item.id !== data.id);
					const json = JSON.stringify(updated);
					localStorage.setItem(key, json);
					dispatchStorageEvent(key, json);
				};
				break;
			};

			case 'read': {
				const json = localStorage.getItem(key);
				setDatas(json ? JSON.parse(json) : []);
				break;
			};
		};
	}, [action, key, data]);

	return { datas };
}
