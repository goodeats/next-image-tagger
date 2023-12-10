export const formatTimeStampsReadable = (timestamp: Date): string => {
  return new Date(timestamp).toLocaleString();
};
