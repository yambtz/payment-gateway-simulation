interface StatusCount {
  reason: string;
  count: number;
}

const merchantStatuses = new Map<string, StatusCount[]>();

export const getStatuses = (merchantIdentifier: string): StatusCount[] => {
  return merchantStatuses.get(merchantIdentifier) ?? []
}

export const addStatus = (merchantIdentifier: string, reason: string): void => {
  const statuses = getStatuses(merchantIdentifier);
  const existingStatus = statuses.find(s => s.reason === reason);
  if (existingStatus) {
    existingStatus.count += 1;
  } else {
    statuses.push({ reason, count: 1 })
  }

  merchantStatuses.set(merchantIdentifier, statuses);
}