export const createActionSet = (actionName: string): object => {
	return {
		LOADING: `${actionName}_LOADING`,
		SUCCESS: `${actionName}_SUCCESS`,
		ERROR: `${actionName}_ERROR`,
		actionName,
	}
};
