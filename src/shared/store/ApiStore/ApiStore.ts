import {ApiResponse, IApiStore, RequestParams, StatusHTTP, HTTPMethod} from "./types";
import qs from "qs"


export default class ApiStore implements IApiStore {
    readonly baseUrl: string;
    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        // и присвойте его в this.baseUrl
        this.baseUrl = baseUrl;
    }

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            let urlForRequest: string;
            if (params.method === HTTPMethod.GET && params.data) {
                const resolveAddress: string = '?' + qs.stringify(params.data)
                urlForRequest = this.baseUrl + params.endpoint + resolveAddress
            }
            else {
                urlForRequest = this.baseUrl + params.endpoint
            }
            return fetch(urlForRequest, {
                method: params.method,
                headers: params.headers
            })
                .then(response => {
                    const data = response.json()
                    return data
            })
                .then(data =>{
                    return {success: true,
                            data: data,
                            status: StatusHTTP.OK}
            })
        }
        catch(e) {
            return new Promise(() => {
                console.log('some error')
                console.log(e)
                return {success: false, 
                        data: null, 
                        status: StatusHTTP.NOT_OK}
            })
        }
    }
}
