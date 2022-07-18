export const transformQuery = (orderBy: any) => {
  if (!orderBy) {
    return undefined;
  }

  const [key, value] = orderBy.toString().split('_');

  return {
    [key]: value,
  };
};
