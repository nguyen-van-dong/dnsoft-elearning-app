import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import contactService from '../../api/contact.api';

export const getAboutMe = createAsyncThunk('contact/about-me', async () => {
  try {
    return await contactService.getAboutMe();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const createContact = createAsyncThunk('contact/create-contact', async (data) => {
  try {
    return await contactService.createContact(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  entities: [],
  loading: false,
  aboutMe: null,
  messageErrSubmit: null,
  sentContact: false,
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setMessageErrSubmit: (state) => {
      return { ...state, messageErrSubmit: null };
    },

    setFalseSentContact: (state) => {
      return { ...state, sentContact: false };
    },
  },
  extraReducers: (builder) => {
    // Fetch about me
    builder.addCase(getAboutMe.pending, (state, action) => {
      console.log('Pending getAboutMe ...');
      state.loading = true
    });
    builder.addCase(getAboutMe.fulfilled, (state, action) => {
      console.log(`Fulfilled getAboutMe`);
      state.loading = false
      state.aboutMe = action.payload.data
    });
    builder.addCase(getAboutMe.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAboutMe...`);
      state.loading = false
    });

    // Create contact
    builder.addCase(createContact.pending, (state, action) => {
      console.log('Pending createContact ...');
      state.loading = true
      state.sentContact = false;
    });
    builder.addCase(createContact.fulfilled, (state, action) => {
      console.log(`Fulfilled createContact`);
      state.loading = false
      state.course = action.payload.data;
      state.sentContact = true;
    });
    builder.addCase(createContact.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected createContact...`);
      state.loading = false;
      state.messageErrSubmit = 'Không thể gởi thông tin liên hệ, vui lòng kiểm tra lại';
      state.sentContact = false;
    });
  }
})

export const { setMessageErrSubmit, setFalseSentContact } = contactSlice.actions

export default contactSlice.reducer
