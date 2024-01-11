export const clean = <T>(array: readonly T[]) => {
  return array.filter((item) => !!item) as Exclude<NonNullable<T>, boolean>[];
};
