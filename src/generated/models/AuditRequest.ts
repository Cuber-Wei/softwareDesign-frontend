/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AuditRequest = {
    id?: number;
    operation?: AuditRequest.operation;
    type?: AuditRequest.type;
};
export namespace AuditRequest {
    export enum operation {
        WAITING = 'WAITING',
        PASSED = 'PASSED',
        RETURNED = 'RETURNED',
    }
    export enum type {
        POST = 'POST',
        COMMENT = 'COMMENT',
        WRITE_UP = 'WriteUp',
    }
}

