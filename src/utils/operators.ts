export type ValidOperators = [operatorsAttr, operatorsAttr, operatorsAttr];

export type ValidPosition = 1 | 2 | 3;

export interface operatorsAttr {
    position: ValidPosition;
    operator: string | null;
}

export interface IPosition {
    value: ValidPosition;
    label: 'Stanowisko 1' | 'Stanowisko 2' | 'Stanowisko 3';
}

export const operators: IPosition[] = [
    { value: 1, label: 'Stanowisko 1' },
    { value: 2, label: 'Stanowisko 2' },
    { value: 3, label: 'Stanowisko 3' },
];