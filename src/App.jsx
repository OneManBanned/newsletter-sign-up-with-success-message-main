import { useState } from 'react'
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

function App() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [userEmail, setUserEmail] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: values => {
      setUserEmail(values.email)
      setIsCompleted(!isCompleted)
    },
  });


  return (
    <main>
      {!isCompleted ?
        <section>
          <h1>Stay updated!</h1>
          <h2>join 60,000+ product managers receiving monthly updates</h2>
          <ul>
            <li>Product discovery and building what matters</li>
            <li>Measureing to ensure updates are a success</li>
            <li>and much more!</li>
          </ul>
          < form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
            <button type="submit">Subscribe to monthly newsletter</button>
          </form>
        </section>
        : <section>
          <h1>Thank for subscribing!</h1>
          <p>A confirmation email has been sent to {userEmail}. Please open it and click the button inside to confirm your subscription.</p>
          <button onClick={() => setIsCompleted(!isCompleted)}>Dimiss message</button>
        </section>
      }
    </main>
  )

}



export default App
