import { Request } from 'express';
import moment from 'moment';

export const parseId = (req: Request): number | null => {
	const id = req.params.id;
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	return null;
}

export const convertDate = (date: Date) => {
	return moment(date);
}

export const containsKeys = (object: Object, keys: string[]): boolean => {
	return isSubset(Object.keys(object), keys)
}

export const isSubset = (set: any[], subset: any[]): boolean => {
	return subset.every((val: any) => set.includes(val));
}

export const getFirstDifference = (first: string, second: string): number | undefined =>  {
	const longest = Math.max(first.length, second.length);
	for (var i = 0; i < longest; i++) {
		if (first[i] !== second[i]) return i;
	}
	return undefined;
}

export const validateMimeType = (file: Express.Multer.File, types: string[]): boolean => {
	return types.includes(file.mimetype);
}
