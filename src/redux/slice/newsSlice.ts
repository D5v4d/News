import { createSlice} from "@reduxjs/toolkit";
import { data } from "../../api/data";


const newsSlice = createSlice({
  name: "news",
  initialState: data,
  reducers: {},
});

// Экспортируем действия
// export const {updataTicket, addTickets} = newsSlice.actions;


// Экспортируем редьюсер
export default newsSlice.reducer;
