
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface GetTaskInput {
    taskId: string;
    userId: string;
}

export interface GetAllTaskInput {
    paged?: Nullable<number>;
    userId: string;
}

export interface UserInput {
    userId: string;
    name: string;
    photoURL?: Nullable<string>;
}

export interface EditTaskInput {
    taskId: string;
    userId: string;
    name: string;
}

export interface Task {
    taskId: string;
    name: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime;
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
    getUser(userId: string): User | Promise<User>;
    getTask(params: GetTaskInput): Task | Promise<Task>;
    getAllTasks(params: GetAllTaskInput): Task[] | Promise<Task[]>;
}

export interface IMutation {
    createUser(params: UserInput): User | Promise<User>;
    updateUser(params: UserInput): User | Promise<User>;
    deleteUser(userId: string): boolean | Promise<boolean>;
    addTask(params: EditTaskInput): Task | Promise<Task>;
    updateTask(params: EditTaskInput): Task | Promise<Task>;
    deleteTask(params: GetTaskInput): boolean | Promise<boolean>;
}

export type DateTime = any;
type Nullable<T> = T | null;
