export function isValidHttpUrl(str) {
try {
const u = new URL(str);
return u.protocol === 'http:' || u.protocol === 'https:';
} catch {
return false;
}
}