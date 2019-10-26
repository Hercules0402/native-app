import {BUILDER_OPTIONS} from "../constants/builder-options";
import BuilderError from "../errors/builder-error";
import normaliseUrl from "../utils/normalise";
import {getPageTitle} from "../utils/network";
import {CONSTANTS} from "../constants/constants";

export default class Builder {

  constructor(targetUrl, options = {}) {
    this._url = normaliseUrl(targetUrl);
    if (!this._url) {
      throw new BuilderError(`Url: "${targetUrl}" is invalid!`);
    }
    if (Object.entries(options).length === 0 && options.constructor === Object) {
      this._options = BUILDER_OPTIONS
    } else {
      this._options = {...BUILDER_OPTIONS, ...options};
    }

    if (!this._options.name || this._options.name.trim().length === 0) {
      Builder.inferTitle(this._url)
        .then((result) => this._options.name = result)
        .catch((error) => this._options.name = error);
    }
    console.log(this._options);

  }

  static async inferTitle(url) {
    return getPageTitle(url)
      .then((pageTitle) => pageTitle || CONSTANTS.appName)
      .catch(() => {return CONSTANTS.appName});
  }

}
