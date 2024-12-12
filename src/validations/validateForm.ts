import * as yup from 'yup';

// This carries out a yup validation on the object
const validate = async (
  data: Record<string, any>,
  validationSchema: yup.ObjectSchema<any>
): Promise<Record<string, string>> => {
  try {
    await validationSchema.validate(data, { abortEarly: false });
    return {};
  } catch (err) {
    // If there are errors we iterate through them and put them onto an error object to be consumed by the calling function
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
