export default class Utils {
  /**
   * Calculate and return the age based on DD/MM/YYYY
   * @param dateString
   * @returns {number} dateString
   */
  static pipeAge(dateString: string): number {
    if (!dateString) {
      return 0;
    }
    const today = new Date(),
      splitDate = dateString.substr(0, dateString.indexOf(' ')).split('-'),
      birthDate = new Date(
        [splitDate[1], splitDate[2], splitDate[0]].join('/')
      ),
      m = today.getMonth() - birthDate.getMonth(),
      age = today.getFullYear() - birthDate.getFullYear();

    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;
  }

  /**
   * Return a date string as DD/MM/YYYY
   * @param dateString
   * @returns {string}
   */
  static pipeDate(dateString: string): string {
    if (!dateString) {
      return '';
    }
    const splitDate = dateString.substr(0, dateString.indexOf(' ')).split('-');
    return [splitDate[2], splitDate[1], splitDate[0]].join('/');
  }

  /**
   * Return the gender string
   * @param num
   * @returns {string}
   */
  static pipeGender(num: number) {
    return num === 545 ? 'Male' : 'Female';
  }
}
