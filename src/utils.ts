export const transformQuery = (orderBy: any) => {
  if (!orderBy) {
    return null;
  }

  const [key, value] = orderBy.toString().split('_');

  return {
    [key]: value,
  };
};
