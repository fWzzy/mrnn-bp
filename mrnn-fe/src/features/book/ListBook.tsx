import { Box, SimpleGrid } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Card from "components/Card";
import { useEffect } from "react";
import Book from "./Book";
import { fetchBook } from "./book.slice";
import { BookForm } from "./BookForm";

export function ListBook() {
  const dispatch = useAppDispatch()
  const books = useAppSelector(state => state.book.books)

  useEffect(() => {
    dispatch(fetchBook({}))
  }, [])

  return (
    <Box>
      <Card>
        <BookForm />
      </Card>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {
          books.map(({ title, idx, author, isbn }) => (
            <Box key={idx}>
              <Book
                idx={idx}
                title={title}
                author={author}
                isbn={isbn}
              />
            </Box>
          ))
        }
      </SimpleGrid>
    </Box>
  )
}