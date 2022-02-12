
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface UserInput {
    userId: string;
    name: string;
    photoURL?: Nullable<string>;
}

export interface User {
    userId: string;
    name: string;
    photoUrl: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime;
}

export interface IQuery {
    getUser(id: number): User | Promise<User>;
}

export interface IMutation {
    createUser(params: UserInput): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
