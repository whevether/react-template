const sum = require('./sum');

describe('adds 1 + 2 to equal 3', () => {
  it("should import",()=>{
    expect(sum(1, 2)).toBe(3);
  });
});