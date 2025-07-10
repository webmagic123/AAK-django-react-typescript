import { AxiosResponse } from "axios";

export interface ApiCallParams {
    type: any;
    method: string;
    path: string | ((action: any) => string);
    headers?: Record<string, string>;
    success?: (res: AxiosResponse<any>, action: any) => any;
    fail?: (error: any) => any;
    payloadOnSuccess?: (data: any, action: any) => any;
    payloadOnFail?: (error: any, action: any) => any;
}