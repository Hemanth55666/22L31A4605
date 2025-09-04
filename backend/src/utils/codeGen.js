import { customAlphabet } from 'nanoid';


const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


export function generateCode(len = 7) {
const nano = customAlphabet(alphabet, len);
return nano();
}