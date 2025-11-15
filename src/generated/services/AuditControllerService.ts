/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditRequest } from '../models/AuditRequest';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_Page_Post_ } from '../models/BaseResponse_Page_Post_';
import type { BaseResponse_Page_PostComment_ } from '../models/BaseResponse_Page_PostComment_';
import type { BaseResponse_Page_WriteUp_ } from '../models/BaseResponse_Page_WriteUp_';
import type { PostCommentQueryRequest } from '../models/PostCommentQueryRequest';
import type { PostQueryRequest } from '../models/PostQueryRequest';
import type { WriteUpQueryRequest } from '../models/WriteUpQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuditControllerService {
    /**
     * doAudit
     * @param auditRequest auditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doAuditUsingPost(
        auditRequest: AuditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/audit/do',
            body: auditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUnauditedPostCommentByPage
     * @param commentQueryRequest commentQueryRequest
     * @returns BaseResponse_Page_PostComment_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUnauditedPostCommentByPageUsingPost(
        commentQueryRequest: PostCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostComment_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/audit/list/comment/page',
            body: commentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUnauditedPostByPage
     * @param postQueryRequest postQueryRequest
     * @returns BaseResponse_Page_Post_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUnauditedPostByPageUsingPost(
        postQueryRequest: PostQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Post_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/audit/list/post/page',
            body: postQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUnauditedWriteUpByPage
     * @param writeUpQueryRequest writeUpQueryRequest
     * @returns BaseResponse_Page_WriteUp_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUnauditedWriteUpByPageUsingPost(
        writeUpQueryRequest: WriteUpQueryRequest,
    ): CancelablePromise<BaseResponse_Page_WriteUp_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/audit/list/writeup/page',
            body: writeUpQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
