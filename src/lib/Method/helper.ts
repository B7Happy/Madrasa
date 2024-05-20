export function makeDomNumberSelectData(arr: number[]): { value: number; name: string }[] {
	return arr.map((item) => ({ value: item, name: item.toString() }));
}

export function Grp(id: number) {
	let grp = '';
	switch (id) {
		case 1: {
			grp = 'GRP1';
			break;
		}
		case 2: {
			grp = 'GRP2';
			break;
		}
		case 3: {
			grp = 'GRP3';
			break;
		}
		default: {
			grp = 'GRP';
			break;
		}
	}
	return grp;
}

export const devApi = 'http://localhost:5272/api/';
export const prodApi = 'https://madrasaapi.azurewebsites.net/api/';