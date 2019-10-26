import sanitize from 'sanitize-filename';
import * as _ from 'lodash';

export function sanitiseString(str, platform) {
  let result = sanitize(str);
  // remove all non ascii or use default app name
  result = result.replace(/[^\x00-\x7F]/g, '') || 'APP';

  // spaces will cause problems with Ubuntu when pinned to the dock
  if (platform === 'linux') {
    return _.kebabCase(result);
  }
  return result;
}
