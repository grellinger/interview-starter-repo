"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api";
import { NewProduct } from "@/lib/types";
import styles from "./AddProduct.module.scss";

const initialValues: NewProduct = { name: "", brand: "", price: 0 };

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  brand: Yup.string().trim().required("Brand is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
});

export default function AddProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <section className={styles.form}>
      <h2>Add Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await mutation.mutateAsync(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>
              Name
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="span" className={styles.error} />
            </label>
            <label>
              Brand
              <Field name="brand" type="text" />
              <ErrorMessage name="brand" component="span" className={styles.error} />
            </label>
            <label>
              Price
              <Field name="price" type="number" step="0.01" />
              <ErrorMessage name="price" component="span" className={styles.error} />
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Add Product"}
            </button>
            {mutation.isError && (
              <span className={styles.error}>
                {(mutation.error as Error).message}
              </span>
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
}
