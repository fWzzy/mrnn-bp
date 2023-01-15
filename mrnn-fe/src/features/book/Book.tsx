import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppDispatch } from 'app/hooks';
import { Fragment, useState } from 'react';
import Card from '../../components/Card';
import { deleteBook, fetchBook } from './book.slice';
import { BookForm } from './BookForm';

export interface IBookProps {
  idx: string
  title: string
  author: string
  isbn: number
}

export default function Book(props: IBookProps) {
  const dispatch = useAppDispatch()
  const [edit, setEdit] = useState(false)

  const gray2 = useColorModeValue('gray.700', 'gray.400')

  const removeBook = async (idx: string) => {
    await dispatch(deleteBook(idx))
    await dispatch(fetchBook({}))
  }

  const BookDetail = (
    <Fragment>
      <Flex flex={1}>
        <Image
          objectFit="cover"
          boxSize="100%"
          src={'https://freepngimg.com/download/book/8-2-book-png-9.png'}
        />
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={1}
        pt={2}>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {props.title}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
          {props.isbn}
        </Text>
        <Text
          textAlign={'center'}
          color={gray2}
          px={3}>
          Author: {props.author}
        </Text>

        <Stack
          width={'100%'}
          mt={'2rem'}
          direction={'row'}
          padding={2}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Button
            onClick={() => removeBook(props.idx)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'red.200'}
            _hover={{
              bg: 'red.300',
            }}>
            Delete
          </Button>
          <Button
            onClick={() => setEdit(!edit)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Edit
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  )

  return (
    <Card>
      {edit ? <BookForm idx={props.idx} cb={() => setEdit(!edit)} /> : BookDetail}
    </Card>
  );
}