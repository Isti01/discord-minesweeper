export const deepClone = <T>(input: T): T => JSON.parse(JSON.stringify(input));
