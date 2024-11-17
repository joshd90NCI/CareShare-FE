import * as yup from 'yup';

const validate = async (
  data: Record<string, any>,
  validationSchema: yup.ObjectSchema<any>
): Promise<Record<string, string>> => {
  try {
    await validationSchema.validate(data, { abortEarly: false });
    return {};
  } catch (err) {
    const errors: Record<string, string> = {};
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((e) => {
        if (e.path) {
          errors[e.path] = e.message;
        }
      });
      return errors;
    }
    errors['general'] = 'There was an unexpected error validating';
    return errors;
  }
};

export default validate;
