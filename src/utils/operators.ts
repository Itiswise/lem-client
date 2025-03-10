export type ValidOperators = operatorsAttr[] | [];
export type ValidScanOperators = scanOperatorsAttr[] | [];

export interface operatorsAttr {
    position: number;
    operator: string | null;
    firstName: string;
    lastName: string;
    identifier: string;
    _line?: string | null;
}

export interface scanOperatorsAttr {
    position: number;
    firstName: string;
    lastName: string;
    identifier: string;
    _line?: string | null;
}