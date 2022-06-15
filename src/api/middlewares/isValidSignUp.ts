import { body } from 'express-validator';

/**
 * @id number, required
 * @nickname string, length : 2~10, required
 * @mbti string, required
 */
export const isValidSignUp = [
  body('id')
    // express-validator.isNumeric()은 string으로 넘어온 숫자도 통과하기 때문에 custom 사용
    .custom((id) => {
      if (typeof id !== 'number') {
        throw new Error('invalid datatype (id)');
      }
      return true;
    })
    .notEmpty()
    .withMessage('id is required'),
  body('nickname') // TODO: 이모지
    .isString()
    .withMessage('invalid datatype (nickname)')
    .isLength({ min: 2, max: 10 })
    .withMessage('nickname can between 2 and 10 characters') //
    .matches(/^[a-zA-Zㄱ-힣0-9]+$/)
    .withMessage('nickname can only korean, english, number')
    .notEmpty()
    .withMessage('nickname is required'),
  body('mbti').isString().withMessage('invalid datatype (mbti)').notEmpty().withMessage('mbti is required'),
];
