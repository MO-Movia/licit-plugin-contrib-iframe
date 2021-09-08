
const HTTP_PREFIX = /^http(s?):*\/\//i;

export default function prefixHTTPProtocol(url?: string): string {
  const HTTP = 'http://';
  if (!url) {
    return HTTP;
  }
  if (HTTP_PREFIX.test(url)) {
    return url;
  }
  return HTTP + url;
}
