import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface SignInValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignInScreen() {
  const initialValues: SignInValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (
    values: SignInValues,
    { resetForm }: FormikHelpers<SignInValues>
  ) => {
    alert("Signed in:\n" + JSON.stringify(values, null, 2));
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Ionicons name="person-circle-outline" size={70} color="black" />

      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }: FormikProps<any>) => (
          <>
          <View style= {styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <View style= {styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
          </View>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button title="Sign In" onPress={() => handleSubmit()} />

            <Link href="/signup">
              <Text style={{ marginTop: 20, color: "blue" }}>Go to Sign Up</Text>
            </Link>

            <Link href="/employeeform">
              <Text style={{ marginTop: 20, color: "blue" }}>Employee Form</Text>
            </Link>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 5, flex: 1 },
  error: { color: "red", marginBottom: 5, fontSize: 12 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row", justifyContent: "center",
  },
  link: {
    color: "blue",
  },
});
