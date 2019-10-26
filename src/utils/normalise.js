import url from 'url';
import validator from 'validator';

function appendProtocol(urlString) {
  const parsed = url.parse(urlString);

  if (!parsed.protocol) {
    return `http://${urlString}`;
  }
  return urlString;
}

export default function normaliseUrl(url) {
  if (typeof url !== 'string') {
    return null;
  }
  url = url.trim().toString();
  const urlWithProtocol = appendProtocol(url);
  const validatorOptions = {
    require_protocol: true,
    require_tld: false,
    allow_trailing_dot: true
  };
  if (!validator.isURL(urlWithProtocol, validatorOptions)) {
    return null
  }
  return urlWithProtocol;
}
