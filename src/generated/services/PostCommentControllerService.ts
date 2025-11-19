/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_PostComment_ } from '../models/BaseResponse_Page_PostComment_';
import type { BaseResponse_Page_PostCommentVO_ } from '../models/BaseResponse_Page_PostCommentVO_';
import type { BaseResponse_PostCommentVO_ } from '../models/BaseResponse_PostCommentVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { PostCommentAddRequest } from '../models/PostCommentAddRequest';
import type { PostCommentQueryRequest } from '../models/PostCommentQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostCommentControllerService {
    /**
     * addPostComment
     * @param postCommentAddRequest postCommentAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addPostCommentUsingPost(
        postCommentAddRequest: PostCommentAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/postComment/add',
            body: postCommentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deletePostComment
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deletePostCommentUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/postComment/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getPostCommentVOById
     * @param id id
     * @returns BaseResponse_PostCommentVO_ OK
     * @throws ApiError
     */
    public static getPostCommentVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_PostCommentVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/oj/api/postComment/get/vo',
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
     * listPostCommentByPage
     * @param postCommentQueryRequest postCommentQueryRequest
     * @returns BaseResponse_Page_PostComment_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listPostCommentByPageUsingPost(
        postCommentQueryRequest: PostCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostComment_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/postComment/list/page',
            body: postCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listPostCommentVOByPage
     * @param postCommentQueryRequest postCommentQueryRequest
     * @returns BaseResponse_Page_PostCommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listPostCommentVoByPageUsingPost(
        postCommentQueryRequest: PostCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostCommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/postComment/list/page/vo',
            body: postCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyPostCommentVOByPage
     * @param postCommentQueryRequest postCommentQueryRequest
     * @returns BaseResponse_Page_PostCommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyPostCommentVoByPageUsingPost(
        postCommentQueryRequest: PostCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostCommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/postComment/my/list/page/vo',
            body: postCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * searchPostCommentVOByPage
     * @param postCommentQueryRequest postCommentQueryRequest
     * @returns BaseResponse_Page_PostCommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static searchPostCommentVoByPageUsingPost(
        postCommentQueryRequest: PostCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostCommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oj/api/postComment/search/page/vo',
            body: postCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
