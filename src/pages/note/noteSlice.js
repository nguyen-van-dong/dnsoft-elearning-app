import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import noteService from '../../api/note.api';

const initialState = {
  lesson: null,
  loading: false,
  note: null,
  noteLists: [],
  loadingNote: false,
  selectedNote: null,
}

export const getNoteLists = createAsyncThunk('learning/notes-list', async (lessonId) => {
  try {
    return await noteService.getNotes(lessonId);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const createNote = createAsyncThunk('learning/create-note', async (data) => {
  try {
    return await noteService.createNote(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const deleteNote = createAsyncThunk('learning/delete-note', async (data) => {
  try {
    return await noteService.deleteNote(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    getLessonNoteLists: (state, action) => {
      return {...state, noteLists: state.noteLists}
    },
    setEmptyNoteLists: (state, action) => {
      return {...state, noteLists: []}
    },
    setSelectedNote: (state, action) => {
      return {...state, selectedNote: action.payload}
    },
    setNullSelectedNote: (state, action) => {
      return {...state, selectedNote: null}
    }
  },
  extraReducers: (builder) => {
    // Fetch note lists
    builder.addCase(getNoteLists.pending, (state, action) => {
      console.log('Pending getNoteLists ...');
      state.loading = true;
      state.loadingNote = true;
    });
    builder.addCase(getNoteLists.fulfilled, (state, action) => {
      console.log(`Fulfilled getNoteLists`);
      state.loading = false;
      state.noteLists = action.payload.data;
      state.loadingNote = false;
    });
    builder.addCase(getNoteLists.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getNoteLists...`);
      state.loading = false;
      state.loadingNote = false;
    });

    // Create note
    builder.addCase(createNote.pending, (state, action) => {
      console.log('Pending createNote ...');
      state.loading = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      console.log(`Fulfilled createNote`);
      state.loading = false;
      state.note = action.payload
    });
    builder.addCase(createNote.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected createNote...`);
      state.loading = false;
    });

    // Delete note
    builder.addCase(deleteNote.pending, (state, action) => {
      console.log('Pending deleteNote ...');
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      console.log(`Fulfilled deleteNote`);
      state.loading = false;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected deleteNote...`);
      state.loading = false;
    });
  },
});

export const { getLessonNoteLists, setEmptyNoteLists, setSelectedNote, setNullSelectedNote } = noteSlice.actions;

export default noteSlice.reducer;
