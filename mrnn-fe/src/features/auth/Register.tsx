import { Box, Flex, VStack, Link, Divider, useToast } from "@chakra-ui/react";
import { useAppDispatch } from "app/hooks";
import { Formik, FormikHelpers } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LoginUser, register } from "./auth.slice";

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast()

  const onSubmit = async (values: any, { setSubmitting }: FormikHelpers<LoginUser>) => {
    const result = await dispatch(register(values))

    setSubmitting(false)
    if (result.meta.requestStatus === "fulfilled")
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => {
          navigate('/login')
        }
      })
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
              <InputControl
                name="password"
                label="Password"
                inputProps={{ type: 'password' }}
              />

              <SubmitButton colorScheme="purple" width="full">Register</SubmitButton>
              <Divider />
              <Link as={RouterLink} to="/login">
                Login you account
              </Link>
            </VStack>
          </Box>
        )}
      </Formik>
    </Flex>
  );
}