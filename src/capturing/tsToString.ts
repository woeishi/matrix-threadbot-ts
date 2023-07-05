export function tsToString(ts: number) {
  const date = new Date(ts);
  const iso = date.toISOString();
  return iso.replace("T"," ").substring(0,iso.length-5);
}