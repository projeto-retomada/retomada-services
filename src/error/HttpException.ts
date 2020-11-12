class HttpException extends Error {
    status: number;
    message: string;
    detail: string;
    constructor(status: number, message: string, detail: string) {
        super();
        this.detail = detail;
        this.message = message;
        this.status = status;
    }
}

export default HttpException;