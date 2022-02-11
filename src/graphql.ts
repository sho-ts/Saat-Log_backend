
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
    photoUrl: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deleteAt: DateTime;
}

export interface IQuery {
    getUser(id: number): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
