
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    userId: string;
    name: string;
    createdAt: DateTime;
}

export interface IQuery {
    getUser(id: number): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
