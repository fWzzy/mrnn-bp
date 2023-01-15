import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { AxiosResponse } from "axios";
import http from "commons/http";
import { API_URL } from "setting";

export type BookDto = {
  idx?: string
  title: string
  author: string
  isbn: number | undefined
}

export type Book = {
  id: number
  idx: string
  title: string
  author: string
  isbn: number
}

export type BookState = {
  loading: 'idle' | 'pending'
  books: Book[]
  bookInfo: Book | null
}

const initialState: BookState = {
  loading: 'idle',
  books: [],
  bookInfo: null
}

export const fetchBook = createAsyncThunk<AxiosResponse<Book[]>, any>(
  'book/fetchAll',
  async () => {
    const response = await http.get<Book[]>(`${API_URL}/books`)

    return response
  }
)

export const getBookDetail = createAsyncThunk<AxiosResponse<Book>, string>(
  'book/getDetail',
  async (idx) => {
    const response = await http.get<Book>(`${API_URL}/books/${idx}`)

    return response
  }
)

export const createBook = createAsyncThunk<AxiosResponse<Book>, BookDto>(
  'book/create',
  async (data) => {
    const response = await http.post<Book>(`${API_URL}/books`, data)

    return response
  }
)

export const updateBook = createAsyncThunk<AxiosResponse<Book>, BookDto>(
  'book/update',
  async ({ idx, ...data }) => {
    const response = await http.put<Book>(`${API_URL}/books/${idx}`, data)

    return response
  }
)

export const deleteBook = createAsyncThunk<boolean, string>(
  'book/delete',
  async (idx) => {
    await http.delete<boolean>(`${API_URL}/books/${idx}`)

    return true
  }
)

function isPendingAction(action: AnyAction) {
  return action.type.endsWith("/pending");
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBook.fulfilled, (state, { payload: { data } }) => {
      state.loading = "idle";
      state.books = data
    })

    builder.addCase(getBookDetail.fulfilled, (state, { payload: { data } }) => {
      state.loading = "idle";
      state.bookInfo = data
    })

    builder.addMatcher(isPendingAction, (state) => {
      state.loading = "pending";
    })
  },
})

export const bookInfoToDto: (idx: string | undefined) => (state: RootState) => BookDto = (idx) => (state: RootState) => {
  const bookData = state.book.books.find(n => n.idx === idx)

  return {
    title: bookData?.title || '',
    author: bookData?.author || '',
    isbn: bookData?.isbn || 0,
  }
}

export default bookSlice.reducer