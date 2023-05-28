import { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import './styles/styles.css'
import mobileImg from './assets/images/illustration-sign-up-mobile.svg'
import desktopImg from './assets/images/illustration-sign-up-desktop.svg'

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
  const [image, setImage] = useState('')

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

  function displayImg() {
    if (window !== undefined) {
      if (window.innerWidth < 500) {
        setImage(mobileImg)
      } else {
        setImage(desktopImg)
      }
    }
  }

  useEffect(() => {
    displayImg()
  }, [])


  window.addEventListener('resize', displayImg)


  return (
    <>
      {!isCompleted ?
        <main>
          <section>
            <h1>Stay updated!</h1>
            <p>join 60,000+ product managers receiving monthly updates</p>
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
          <div>
            <img src={image} alt="" />
          </div>
        </main>
        : <main>
          <h1>Thank for subscribing!</h1>
          <p>A confirmation email has been sent to {userEmail}. Please open it and click the button inside to confirm your subscription.</p>
          <button onClick={() => setIsCompleted(!isCompleted)}>Dimiss message</button>
        </main>
      }
    </>
  )

}



export default App
