import log from "loglevel";
import chai from "chai";
const { expect } = chai;

export default class deep {
	static get(obj: object, path: string[]) {
		expect(obj, "obj").to.be.an("object");
		expect(path, "path").to.be.an("array").with.length.greaterThan(0);

		const remainingPath = Array.from(path);
		const traversedPath: string[] = [];
		let deepObj = obj;
		while (remainingPath.length > 0) {
			const key = remainingPath.shift();
			traversedPath.push(key);
			const value = deepObj[key];
			if (remainingPath.length == 0) {
				return deepObj[key];
			}
			if (typeof value === "object") {
				deepObj = value;
			} else {
				throw new Error(
					`deep.get: Value at ${traversedPath} is a ${typeof value} and not an object.`
				);
			}
		}
	}

	// Returns previus value if one exists, for testing purposes (design for testability).
	static set(
		obj: object,
		path: string[],
		value: any | undefined,
		options: { createPath: boolean } = { createPath: false }
	) {
		expect(obj, "deep.set: obj").to.be.an("object");
		expect(path, "deep.set: path").to.be.an("array").with.length.greaterThan(0);

		if (options.createPath) {
			throw new Error("deep.set: options.createPath is not implemented yet");
		}

		if (path.length === 1) {
			const previousValue = obj[path[0]];
			obj[path[0]] = value;
			return previousValue;
		} else {
			const parentPath = path.slice(0, path.length - 1);
			const parentObj = deep.get(obj, parentPath);
			if (typeof parentObj !== "object") {
				throw new Error("deep.set: parent object doesn't exist");
			}
			const previousValue = parentObj[path[path.length - 1]];
			parentObj[path[path.length - 1]] = value;
			return previousValue;
		}
	}
}
