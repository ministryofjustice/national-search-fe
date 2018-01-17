import Utils from './Utils';

describe('Utils', () => {
  describe('should expose static methods', () => {
    it('pipeAge method should return the numerical age based on DOB', () => {
      expect(Utils.pipeAge()).toEqual(0);
      expect(typeof Utils.pipeAge('1997-02-05 00:00:00')).toEqual('number');
    });

    it('pipeAge method should return the DOB as DD/MM/YYYY', () => {
      expect(Utils.pipeDate()).toEqual('');
      expect(Utils.pipeDate('1997-02-12 00:00:00')).toEqual('12/02/1997');
    });

    it('pipeGender method should return Male/Female based on the passed gender code 545/546', () => {
      expect(Utils.pipeGender(545)).toEqual('Male');
      expect(Utils.pipeGender(546)).toEqual('Female');
    });
  });
});
