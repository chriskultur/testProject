
export interface NumericEnumMember {
  name: string;
  value: number;
}

export interface StringEnumMember {
  name: string;
  value: string;
}

export function listEnumMemberNames(enumType: {[key: number]: string}): string[] {
  return listEnumMemberNamesHelper(enumType);
}

export function listNumericEnumMembers(enumType: {[key: number]: string}): NumericEnumMember[] {
  return listEnumMemberNamesHelper(enumType).map((name) => ({
    name,
    value: Number(enumType[name as any]),
  }));
}

export function listStringEnumMembers(enumType: {[key: number]: string}): StringEnumMember[] {
  return listEnumMemberNamesHelper(enumType).map((name) => ({
    name,
    value: enumType[name as any],
  }));
}

function listEnumMemberNamesHelper(enumType: {[key: number]: string}): string[] {
  return Object.keys(enumType).filter((key) => isNaN(Number(key)));
}
