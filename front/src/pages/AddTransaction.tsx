import { useState } from 'react';
import { createTransaction } from '../api/api';
import { useNavigate } from 'react-router';
import { object, string } from 'yup';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';

const categories = [
  'Daily Living',
  'Housing',
  'Health & Wellness',
  'Entertainment & Lifestyle',
  'Personal',
  'Financial',
  'Family & Social',
  'Work & Education',
  'Travel',
  'Other',
];

const schema = object({
  name: string().required('Must include a name for the transaction'),
  price: string().required('Must include a price for the transaction'),
  category: string().required('Must select a category'),
  type: string().required('Must select a transaction type'),
});

export default function AddTransaction() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', price: '', category: '', type: '' },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await createTransaction({
          name: values.name,
          price: values.price,
          category: values.category,
          transactionType: values.type,
        });
        navigate('/transactions');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="flex flex-col flex-1 items-start py-5 pb-15 px-5 items-center ">
      <h1 className="text-2xl font-bold text-center w-full pb-4 mt-4">
        Create Transaction
      </h1>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex gap-10 flex-col w-full bg-white rounded-xl shadow border-border border p-5"
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="border-border border rounded-lg p-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage component="span" name="name" className="text-red-800" />
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="border-border border rounded-lg p-2"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => {
              const allowed = [
                'Backspace',
                'Delete',
                'ArrowLeft',
                'ArrowRight',
                'Tab',
              ];
              if (!/[\d.]/.test(e.key) && !allowed.includes(e.key)) {
                e.preventDefault();
              }
              if (e.key === '.' && formik.values.price.includes('.')) {
                e.preventDefault();
              }
            }}
          />
          <ErrorMessage
            component="span"
            name="price"
            className="text-red-800"
          />
          <select
            name="category"
            id="category"
            className="border-border border rounded-lg p-2"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select a category</option>
            {categories.map((c, i) => (
              <option value={c} key={i}>
                {c}
              </option>
            ))}
          </select>
          <ErrorMessage
            component="span"
            name="category"
            className="text-red-800"
          />
          <div className="flex justify-around">
            <div className="flex gap-2 w-25">
              <input
                type="radio"
                name="type"
                id="income"
                value="income"
                checked={formik.values.type === 'income'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="income">Income</label>
            </div>
            <div className="flex gap-2 w-25">
              <input
                type="radio"
                name="type"
                id="expense"
                value="expense"
                checked={formik.values.type === 'expense'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="expense">Expense</label>
            </div>
          </div>
          <ErrorMessage component="span" name="type" className="text-red-800" />
          <button
            disabled={loading}
            className="mt-8 bg-primary/90 cursor-pointer py-4 rounded-lg font-bold text-lg text-white shadow hover:shadow-lg transition-all duration-200 hover:bg-primary"
          >
            {loading ? 'Creating...' : 'Create Transaction'}
          </button>
        </form>
      </FormikProvider>
    </section>
  );
}
