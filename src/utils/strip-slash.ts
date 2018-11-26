export function stripSlash(value: string): string {
    if (!value || !value.length) {
        return value;
    }

    let retVal = value;

    if (retVal[0] === '/') {
        retVal = retVal.slice(1);
    }
    if (retVal.slice(-1) === '/') {
        retVal = retVal.slice(0, -1);
    }

    return retVal;
}

export function stripStarterSlash(value: string): string {
    if (!value || !value.length) {
        return value;
    }

    return value[0] === '/' ? value.substr(1) : value;
}

export function stripEndingSlash(value: string): string {
    if (!value || !value.length) {
        return value;
    }

    return value.slice(-1) === '/' ? value.slice(0, -1) : value;
}
