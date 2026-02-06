import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router';
import { object, string } from 'yup';

export default function Login() {
  const schema = object({
    email: string()
      .email('Email must be a valid address')
      .required('Email is required'),
    password: string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: (values) => console.log(values),
  });
  return (
    <section className="flex pt-8 flex-col items-center">
      <h1 className="text-2xl w-full text-center font-bold">Welcome Back</h1>
      <p className="text-text/50 text-md">Enter your credentials to log in</p>
      <FormikProvider value={formik}>
        <form
          className="flex flex-col gap-4 mt-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col text-red-800 gap-1 text-sm font-bold">
            <ErrorMessage
              component="div"
              className="text-red-800"
              name="email"
            />
            <ErrorMessage
              component="div"
              className="text-red-800"
              name="password"
            />
          </div>
          <div className="flex flex-col gap-1 w-80">
            <label htmlFor="email">Email</label>
            <input
              className={`w-full py-2 pl-2 border border-border rounded focus:outline-primary hover:border-primary transition-all ${formik.touched.email && formik.errors.email ? 'border-red-800 bg-red-100/50' : ''}`}
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label htmlFor="password">Password:</label>
              <Link
                to="/"
                className="text-sm text-primary/70 hover:text-primary transition-all"
              >
                Forgot your password?
              </Link>
            </div>
            <input
              className={`w-full py-2 pl-2 border border-border rounded focus:outline-primary hover:border-primary transition-all ${formik.touched.password && formik.errors.password ? 'border-red-800 bg-red-100/50' : ''}`}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-primary text-center px-3 py-2 text-md font-[700] text-white transition-colors hover:bg-primary/90"
          >
            Log in
          </button>
        </form>
      </FormikProvider>
      <p className="mt-4 text-md text-text/70">
        Don't have an account?{' '}
        <Link
          className="text-primary/70 hover:text-primary transition-all"
          to="/register"
        >
          Register here
        </Link>
      </p>
    </section>
  );
}
