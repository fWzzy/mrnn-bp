import { Box, Button, ButtonGroup, Center, Collapse, useDisclosure, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Formik, FormikHelpers } from "formik";
import { InputControl, ResetButton, SubmitButton } from "formik-chakra-ui";
import * as Yup from "yup";
import { BookDto, bookInfoToDto, createBook, fetchBook, updateBook } from "./book.slice";

export interface IBookForm {
  idx?: string
  cb?: () => void
}

export function BookForm(props: IBookForm) {
  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure()

  const bookInfo: BookDto = useAppSelector(bookInfoToDto(props.idx))

  const onSubmit = async (values: BookDto, { setSubmitting, resetForm }: FormikHelpers<BookDto>) => {
    if (props.idx) {
      await dispatch(updateBook({ idx: props.idx, ...values }))
    } else {
      await dispatch(createBook(values))
    }

    await dispatch(fetchBook({}))
    resetForm()
    props.cb && props.cb()
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    author: Yup.string().required(),
    isbn: Yup.number().required()
  });

  return (
    <Formik
      initialValues={props.idx ? bookInfo : { title: '', author: '', isbn: 0 }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Box w={'100%'} as="form" onSubmit={handleSubmit as any}>
          {
            !props.idx && (
              <Center>
                <Button
                  w={'100%'}
                  mb={4}
                  onClick={onToggle}
                  bg={'gray.400'}
                  _hover={{
                    bg: 'white.500',
                  }}
                >
                  Create new Book
                </Button>
              </Center>
            )
          }
          <Collapse in={!!props.idx || isOpen} animateOpacity>
            <VStack spacing={2} w={'100%'}>
              <InputControl name="title" label="Title" />
              <InputControl name="author" label="Author" />
              <InputControl name="isbn" label="ISBN" inputProps={{ type: "number" }} />

              <ButtonGroup>
                <SubmitButton colorScheme="purple" width="full">Submit</SubmitButton>
                <ResetButton>Reset</ResetButton>
              </ButtonGroup>
            </VStack>
          </Collapse>
        </Box>
      )}
    </Formik>
  )
}