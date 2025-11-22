import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface EmployeeFormValues {
  fullname: string;
  email: string;
  position: string;
  phone: string;
  department: string;
}

const EmployeeSchema = Yup.object().shape({
  fullname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  position: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
});

export default function EmployeeFormScreen() {
  const initialValues: EmployeeFormValues = {
    fullname: "",
    email: "",
    position: "",
    phone: "",
    department: "",
  };

  const handleSubmit = (
    values: EmployeeFormValues,
    { resetForm }: FormikHelpers<EmployeeFormValues>
  ) => {
    alert("Employee Saved:\n" + JSON.stringify(values, null, 2));
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Information</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={handleChange("fullname")}
              onBlur={handleBlur("fullname")}
              value={values.fullname}
            />
            {touched.fullname && errors.fullname && (
              <Text style={styles.error}>{errors.fullname}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Position"
              onChangeText={handleChange("position")}
              onBlur={handleBlur("position")}
              value={values.position}
            />
            {touched.position && errors.position && (
              <Text style={styles.error}>{errors.position}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Phone"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Department"
              onChangeText={handleChange("department")}
              onBlur={handleBlur("department")}
              value={values.department}
            />
            {touched.department && errors.department && (
              <Text style={styles.error}>{errors.department}</Text>
            )}

            <Button title="Submit" onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 30 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 5 },
  error: { color: "red", marginBottom: 10 },
});
