import { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik';
import './styles/styles.css'
import mobileImg from './assets/images/illustration-sign-up-mobile.svg'
import desktopImg from './assets/images/illustration-sign-up-desktop.svg'

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'valid email required';
  }
  return errors;
}

function App() {
  // Used to toggle between success and sign-up 
  const [isCompleted, setIsCompleted] = useState(false)

  // Used to store email string for success screen
  const [userEmail, setUserEmail] = useState('')

  // Set correct image for desktop/mobile view - see displayImg function
  const [image, setImage] = useState('')

  // Store ref to input field in order to manage focus
  const inputRef = useRef(null)

  function displayImg() {
    if (window !== undefined) {
      if (window.innerWidth < 650) {
        setImage(mobileImg)
      } else {
        setImage(desktopImg)
      }
    }
  }

  // On load set correct image and focus input field
  useEffect(() => {
    displayImg()
    inputRef.current.focus()
  }, [])

  // On Change from succes to signup reset form values and focus input
  useEffect(() => {
    formik.values.email = ''
    if (!isCompleted) {
      inputRef.current.focus()
    }
  }, [isCompleted])

  // listen for change in screen size
  window.addEventListener('resize', displayImg)

  // Formik for handling - see docs => 'https://formik.org/docs/overview'
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: values => {
      setUserEmail(values.email)
      setIsCompleted(!isCompleted)
      console.log(userEmail, values.email)
    },
  });

  return (
    <>
      {!isCompleted ?
        <main>
          <section>
            <h1>Stay updated!</h1>
            <p>join 60,000+ product managers receiving monthly updates</p>
            <ul>
              <li>Product discovery and building what matters</li>
              <li>Measuring to ensure updates are a success</li>
              <li>And much more!</li>
            </ul>
            < form onSubmit={formik.handleSubmit} noValidate>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                ref={inputRef}
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder='email@company.com'
                className={formik.touched.email && formik.errors.email
                  ? 'error'
                  : ''}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className='err-span'>{formik.errors.email}</span>
              ) : null}
              <button type="submit">Subscribe to monthly newsletter</button>
            </form>
          </section>
          <img src={image} alt="" />
        </main>
        : <main className='success'>
          <h1 className='success-heading'>Thanks for subscribing!</h1>
          <p className='success-para'>
            A confirmation email has been sent to <span className='success-span'>{userEmail}</span>. Please open it and click the button inside to confirm your subscription.</p>
          <button className='success-btn' onClick={() => setIsCompleted(!isCompleted)}>Dismiss message</button>
        </main>
      }
    </>
  )
}

export default App
