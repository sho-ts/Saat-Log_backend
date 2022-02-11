import { Team } from './team.model';

describe('Team', () => {
  it('should be defined', () => {
    expect(new Team()).toBeDefined();
  });
});
