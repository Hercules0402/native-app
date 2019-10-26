import os from 'os';

export function isOSX() {
    return getPlatform() === 'darwin';
}

export function isLinux() {
    return getPlatform() === 'linux';
}

export function isWindows() {
    return getPlatform() === 'win32';
}

export function is64bit() {
    return getArchitecture() === 'x64';
}

export function is32bit() {
    return getArchitecture() === 'ia32';
}

export function getPlatform() {
    if (os.platform() === 'mac') {
        return 'darwin'
    }
    return os.platform();
}

export function getArchitecture() {
    if (os.arch() === 'x32') {
        return 'ia32';
    }
    return os.arch();
}

export function getOS() {
    return `${os.type()} ${os.release()} ${os.arch()}`;
}

export function isSupportedOS() {
    const isSupportedArch = () => {
        return !(is32bit() === false && is64bit() === false);
    };
    const isSupportedPlatform = () => {
        return !(isOSX() === false && isWindows() === false && isLinux() === false);
    };
    return !(isSupportedArch() === false || isSupportedPlatform() === false);
}
