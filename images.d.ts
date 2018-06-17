declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare module '*.graphql' {
    import {DocumentNode} from 'graphql';

    const value: DocumentNode;
    export = value;
}