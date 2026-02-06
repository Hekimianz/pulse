import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router';
import { object, ref, string } from 'yup';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const { register, user, loading, error, clearError } = useAuth();
  const shema = object({
    firstName: string()
      .required('First name is required')
      .trim()
      .min(3, 'First name must be at least 2 characters')
      .max(50, 'First name must be at most 50 characters')
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
        'First name can only contain letters',
      ),
    lastName: string()
      .required('Last name is required')
      .trim()
      .min(3, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be at most 50 characters')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/, 'Last name can only contain letters'),
    email: string()
      .email('Email must be a valid address')
      .required('Email is required')
      .trim(),
    password: string().required('Password is required'),
    confPassword: string()
      .required('Please confirm your password')
      .oneOf([ref('password')], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confPassword: '',
    },
    validationSchema: shema,
    onSubmit: async (values) => {
      await register(values);
      navigate('/login');
    },
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    clearError();
  });

  return (
    <section className="flex pt-8 flex-col items-center">
      <h1 className="text-2xl w-full text-center font-bold">
        Welcome to Pulse
      </h1>
      <p className="text-text/50 text-md">
        Enter your information to create an account
      </p>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 mt-8"
        >
          <div className="flex flex-col text-red-800 gap-1 text-sm font-bold">
            <ErrorMessage name="firstName" component="span" />
            <ErrorMessage name="lastName" component="span" />
            <ErrorMessage name="email" component="span" />
            <ErrorMessage name="password" component="span" />
            <ErrorMessage name="confPassword" component="span" />
            {error && <div className="text-red-800">{error}</div>}
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="firstName">First Name</label>
              <input
                className={`w-full py-2 pl-2 border border-border rounded focus:outline-primary hover:border-primary transition-all ${formik.touched.firstName && formik.errors.firstName ? 'border-red-800 bg-red-100/50' : ''}`}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={`w-full py-2 pl-2 border border-border rounded focus:outline-primary hover:border-primary transition-all ${formik.touched.lastName && formik.errors.lastName ? 'border-red-800 bg-red-100/50' : ''}`}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
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
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              className={`w-full py-2 pl-2 border border-border rounded focus:outline-primary hover:border-primary transition-all ${formik.touched.password && formik.errors.password ? 'border-red-800 bg-red-100/50' : ''}`}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confPassword">Confirm Password:</label>
            <input
              className={`w-full py-2 pl-2 border border-border rounded focus:outline-primary hover:border-primary transition-all ${formik.touched.confPassword && formik.errors.confPassword ? 'border-red-800 bg-red-100/50' : ''}`}
              type="password"
              name="confPassword"
              id="confPassword"
              placeholder="Enter your password again"
              value={formik.values.confPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-primary text-center px-3 py-2 text-md font-[700] text-white transition-colors hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </FormikProvider>
      <p className="mt-4 text-md text-text/70">
        Already have an account?{' '}
        <Link
          className="text-primary/70 hover:text-primary transition-all"
          to="/login"
        >
          Log in here
        </Link>
      </p>
    </section>
  );
}
