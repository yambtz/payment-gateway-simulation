import Chance from 'chance';
import { getStatuses, addStatus } from './chargeStatuses';

const random = new Chance();

describe('charge statuses', () => {
  it('returns empty array if user has no errors', () => {
    expect(getStatuses(random.string())).toEqual([])
  });
  
  it('adds a new error to a user with no errors', () => {
    const reason = random.string();
    const merchant = random.string();
    addStatus(merchant, reason);
    expect(getStatuses(merchant)).toEqual([{reason, count: 1}])
  });
  
  it('adds a new error to a user with errors', () => {
    const reason = random.string();
    const merchant = random.string();
    addStatus(merchant, reason);
    addStatus(merchant, random.string());
    expect(getStatuses(merchant)).toEqual(
      expect.arrayContaining([{reason, count: 1}])
    )
  });
  
  it('increments existing errors', () => {
    const reason = random.string();
    const merchant = random.string();
    addStatus(merchant, reason);
    addStatus(merchant, reason);
    addStatus(merchant, random.string());
    expect(getStatuses(merchant)).toEqual(
      expect.arrayContaining([{reason, count: 2}])
    )
  });
})