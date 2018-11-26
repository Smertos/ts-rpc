export class TSRpcError {
    status!: number;
    statusText!: string;

    static makeHttpError(status: number, statusText: string): TSRpcError {
        const retVal = new TSRpcError();
        retVal.status = status;
        retVal.statusText = statusText;

        return retVal;
    }

    get isNetworkError(): boolean {
        return !!this.status;
    }
}
