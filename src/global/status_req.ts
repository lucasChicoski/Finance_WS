


export class StatusReq {
    status: string
    data: any
    message: string

    constructor(status: string, data: any, message: string) {
        this.status = status
        this.data = data
        this.message = message
    }


    static response(status: string, data: any, message: string) {
        return {
            "status": status,
            "data": data,
            "message": message
        }
    }

}