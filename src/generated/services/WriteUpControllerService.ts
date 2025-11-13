/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_WriteUp_ } from '../models/BaseResponse_Page_WriteUp_';
import type { BaseResponse_Page_WriteUpVO_ } from '../models/BaseResponse_Page_WriteUpVO_';
import type { BaseResponse_WriteUpVO_ } from '../models/BaseResponse_WriteUpVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { WriteUpAddRequest } from '../models/WriteUpAddRequest';
import type { WriteUpQueryRequest } from '../models/WriteUpQueryRequest';
import type { WriteUpUpdateRequest } from '../models/WriteUpUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WriteUpControllerService {
    /**
     * addWriteUp
     * @param writeUpAddRequest writeUpAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addWriteUpUsingPost(
        writeUpAddRequest: WriteUpAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/writeUp/add',
            body: writeUpAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteWriteUp
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteWriteUpUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/writeUp/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getWriteUpVOById
     * @param id id
     * @returns BaseResponse_WriteUpVO_ OK
     * @throws ApiError
     */
    public static getWriteUpVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_WriteUpVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/oj/api/writeUp/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listWriteUpByPage
     * @param writeUpQueryRequest writeUpQueryRequest
     * @returns BaseResponse_Page_WriteUp_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listWriteUpByPageUsingPost(
        writeUpQueryRequest: WriteUpQueryRequest,
    ): CancelablePromise<BaseResponse_Page_WriteUp_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/writeUp/list/page',
            body: writeUpQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listWriteUpVOByPage
     * @param writeUpQueryRequest writeUpQueryRequest
     * @returns BaseResponse_Page_WriteUpVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listWriteUpVoByPageUsingPost(
        writeUpQueryRequest: WriteUpQueryRequest,
    ): CancelablePromise<BaseResponse_Page_WriteUpVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/writeUp/list/page/vo',
            body: writeUpQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyWriteUpVOByPage
     * @param writeUpQueryRequest writeUpQueryRequest
     * @returns BaseResponse_Page_WriteUpVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyWriteUpVoByPageUsingPost(
        writeUpQueryRequest: WriteUpQueryRequest,
    ): CancelablePromise<BaseResponse_Page_WriteUpVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/writeUp/my/list/page/vo',
            body: writeUpQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * searchWriteUpVOByPage
     * @param writeUpQueryRequest writeUpQueryRequest
     * @returns BaseResponse_Page_WriteUpVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static searchWriteUpVoByPageUsingPost(
        writeUpQueryRequest: WriteUpQueryRequest,
    ): CancelablePromise<BaseResponse_Page_WriteUpVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/writeUp/search/page/vo',
            body: writeUpQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateWriteUp
     * @param writeUpUpdateRequest writeUpUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateWriteUpUsingPost(
        writeUpUpdateRequest: WriteUpUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/writeUp/update',
            body: writeUpUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
