/**
* @file powerOfN.test.ts
* @brief tests for powerOfN function
* @see ivs-cal-sklamanie123/src/lib/src/operations/powerOfN.ts
* @author Dan Valníček
*/

import { powerOfN } from  '../operations/powerOfN'

/**
 * @test {powerOfN}
 */
describe('test powerOfN function', () => {
    it('should return 100000', () => expect(powerOfN(5, 10)).toBe(9765625));
    it('should return 0.00032', () => expect(powerOfN(5, -5)).toBe(0.00032));
    it('should return -1000000', () => expect(powerOfN(-100, 3)).toBe(-1000000));
    it('should return 1', () => expect(powerOfN(1,0.5)).toBe(1));
    it('should return 1.77827941', () => expect(powerOfN(10,0.25)).toBe(1.77827941));
    it('should return -1', () => expect(powerOfN(-1.435,0)).toBe(1));
});
