import { ObjectId } from 'bson';
import { AnyObject } from '@loopback/repository';
import { CredentialModel } from './types/credential.type';

export type MetadataReport<T = AnyObject> = { key: any; value: any; metadata: T; };

export type UpdateFunction = (
    id: string | ObjectId,
    credentials: Array<CredentialModel>
) => Promise<void>;

export type ExpectFunction = (
    id: string | ObjectId,
    sequenceData?: any
) => Promise<ExpectFunctionReport | undefined>;

export type ExpectFunctionReport = {
    overview: {
        passedSituations: Array<string>;
        unpassedSituations: Array<string>;
        ownedCredentials: Array<CredentialModel>;
    };
    details: {
        [situation: string]: SingleExpectReport;
    }
    isMetadataExists: boolean;
    isOptional: boolean;
};

export type SingleExpectReport = {
    errors: Array<{ message: string; details: AnyObject; }>;
    passed: boolean;
    relevances: Array<MetadataReport<AnyObject>>;
};

export type CredentialCached = {
    id: string | ObjectId;
    credentials: Array<CredentialModel>;
};

export type PropType<T, P extends keyof T> = T[P];
