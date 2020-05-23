// @ts-ignore comment
import { Request } from '@loopback/rest';
// @ts-ignore comment
import { ObjectId } from 'bson';
// @ts-ignore comment
import { AnyObject } from '@loopback/repository';

// *********************
// Definition
// *********************

export type CerDefinition = {
    options: {
        cerSource: 'CACHE' | 'DB' | 'CACHE_THEN_DB';
    },
    strategy: CerStrategy;
    cerExamples: CerPackageExamples;
};

// *********************
// Default Types
// *********************

export type CerTokenMetadata = {
    _id: string | ObjectId;
    cerTimestamp: string;
} & AnyObject;

export interface CerStrategy {

    findCers(
        request: Request,
        tokenMetaData: CerTokenMetadata | undefined,
        sequenceData: any | undefined
    ): Promise<Array<CerEntity>>;

    findCersTimestamp(
        request: Request,
        tokenMetaData: CerTokenMetadata | undefined,
        sequenceData: any | undefined
    ): Promise<Date>;

}

// *********************
// Function
// *********************

export type UpdateFunction = (
    _id: string | ObjectId,
    cers: Array<CerEntity>
) => Promise<void>;

export type ExpectFunction = (
    request: Request,
    tokenMetaData?: CerTokenMetadata,
    sequenceMetaData?: any
) => Promise<ExpectFunctionReport | undefined>;

export type ExpectFunctionReport = {
    [situation: string]: {
        errors: Array<{ message: string; details: any; }>;
        passed: boolean;
        relateds: any;
    }
};

// *********************
// Certificate Package
// *********************

export interface CerEntity {
    _id?: string | ObjectId;
    package?: keyof CerPackageExamples;
    contains?: { [key: string]: boolean };
    relateds?: { [key: string]: string | ObjectId };
}

export type CerPackageExamples = {
    [package_name: string]: {
        [contain_name: string]: boolean;
    }
};

export type CerPackageCached = {
    _id: string | ObjectId;
    timestamp: string;
    cers: Array<CerEntity>;
};

// *********************
// Cer Spec
// *********************

export type CerSpec = {
    [situation: string]: {
        [p in keyof CerPackageExamples]?: Partial<CerPackageExamples[p]>;
    }
};
