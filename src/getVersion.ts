export function getVersion() {
  const version = process.env.npm_package_version;
  if (!version) {
    console.error("could not find package version");
    return "0.0.0";
  } else {
    return version;
  }
}