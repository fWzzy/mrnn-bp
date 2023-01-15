import { Box, Flex, VStack, Link, Divider } from "@chakra-ui/react";
import { useAppDispatch } from "app/hooks";
import { Formik, FormikHelpers } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login, LoginUser } from "./auth.slice";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: any, { setSubmitting }: FormikHelpers<LoginUser>) => {
    const result = await dispatch(login(values))

    setSubmitting(false)
    if (result.meta.requestStatus === "fulfilled")
      navigate('/dashboard')
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, errors }) => (
          <Box bg="white" p={6} rounded="md" as="form" onSubmit={handleSubmit as any}>
            <VStack spacing={4} align="flex-start">
              <InputControl name="email" label="Email" />
              <InputControl name="password" label="Password" inputProps={{ type: "password" }} />

              <SubmitButton colorScheme="purple" width="full">Login</SubmitButton>
              <Divider />
              <Link as={RouterLink} to="/register">
                Create new account
              </Link>
            </VStack>
          </Box>
        )}
      </Formik>
    </Flex>
  );
}