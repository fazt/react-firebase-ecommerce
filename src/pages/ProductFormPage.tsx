import { Formik, Form } from 'formik'
import { createProduct } from '../firebase/db'

function ProductFormPage() {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: 0,
        image: null,
      }}
      onSubmit={async (values) => {
        console.log(values)
        try {
          const result = await createProduct({
            name: values.name,
            description: values.description,
            price: values.price,
          })
          console.log(result.id)
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {({ handleChange }) => (
        <Form>
          <input type="text" name="name" onChange={handleChange}
            placeholder="Product Name"
          />
          <input type="text" name='price' onChange={handleChange}
            placeholder="Price"
          />
          <textarea name="description" rows={3} onChange={handleChange}
            placeholder="Description"
          ></textarea>
          <input type="file" name="image" />
          <button type='submit'>Save</button>
        </Form>
      )}
    </Formik>
  )
}

export default ProductFormPage