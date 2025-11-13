/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { SMSSendRequest } from '../models/SMSSendRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SmsControllerService {
    /**
     * sendMailForget
     * @param smsSendRequest smsSendRequest
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendMailForgetUsingPost(
        smsSendRequest: SMSSendRequest,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/sms/sendForget',
            body: smsSendRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * sendMailRegister
     * @param smsSendRequest smsSendRequest
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendMailRegisterUsingPost(
        smsSendRequest: SMSSendRequest,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/sms/sendRegister',
            body: smsSendRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
