import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { IFood } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";
import { RootState } from "../store/store";

export interface IFoodState {
  status: "loading" | "idle";
  error: string | null;
  foods: IFood[];
}

const initialState: IFoodState = {
  foods: [],
  error: null,
  status: "idle",
};

type FetchFoodsError = {
  message: string;
};

export const fetchFoodsAsync = createAsyncThunk<
  IFood[],
  { limit: number; skip: number },
  { rejectValue: FetchFoodsError }
>(
  "foods/fetchFoodsAsync",
  async (data: { limit: number; skip: number }, thunkApi) => {
    let { limit, skip } = data;
    try {
      let response = await axios(
        `http://localhost:3005/food/all?limit=${limit}&skip=${skip}`
      );
      let { data } = await response;
      if (data.success == true) {
        return data.data;
      } // Check if status is not okay:
      else if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({
          message: "Failed to fetch foods.",
        });
      }
    } catch (error: any) {
      // showNotification("error", error.toString());
      // setLoading(false);
      showNotification("error", error.toString());
    }
  }
);

export const selectStatus = (state: RootState) => state.foods.status;

export const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /******* FetchFoodsAsync*******/
    // When we send a request,
    // `fetchFoodsAsync.pending` is being fired:
    builder.addCase(fetchFoodsAsync.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });
    // When a server responses with the data,
    // `fetchFoodsAsync.fulfilled` is fired:
    builder.addCase(fetchFoodsAsync.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      state.foods.push(...payload);
      state.status = "idle";
    });
    // When a server responses with an error:
    builder.addCase(fetchFoodsAsync.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    //   /******* AddToCartAsync*******/
    //   // When we send a request,
    //   // `addToCartAsync.pending` is being fired:
    //   builder.addCase(addToCartAsync.pending, (state) => {
    //     // At that moment,
    //     // we change status to `loading`
    //     // and clear all the previous errors:
    //     state.status = "loading";
    //     state.error = null;
    //   });
    //   // When a server responses with the data,
    //   // `addToCartAsync.fulfilled` is fired:
    //   builder.addCase(addToCartAsync.fulfilled, (state, { payload }) => {
    //     // We add all the new todos into the state
    //     // and change `status` back to `idle`:
    //     state.foods.push(payload);
    //     state.status = "idle";
    //   });
    //   // When a server responses with an error:
    //   builder.addCase(addToCartAsync.rejected, (state, { payload }) => {
    //     // We show the error message
    //     // and change `status` back to `idle` again.
    //     if (payload) state.error = payload.message;
    //     state.status = "idle";
    //   });

    //   /******* deleteCourseFromCartAsync*******/
    //   // When we send a request,
    //   // `deleteCourseFromCartAsync.pending` is being fired:
    //   builder.addCase(deleteCourseFromCartAsync.pending, (state) => {
    //     // At that moment,
    //     // we change status to `loading`
    //     // and clear all the previous errors:
    //     state.status = "loading";
    //     state.error = null;
    //   });
    //   // When a server responses with the data,
    //   // `addToCartAsync.fulfilled` is fired:
    //   builder.addCase(
    //     deleteCourseFromCartAsync.fulfilled,
    //     (state, { payload }) => {
    //       // We add all the new todos into the state
    //       // and change `status` back to `idle`:
    //       // state.foods.push(payload);

    //       state.foods = state.foods.filter((cartCourse) => {
    //         return cartCourse.course_id !== payload.course_id;
    //       });

    //       state.status = "idle";
    //     }
    //   );
    //   // When a server responses with an error:
    //   builder.addCase(
    //     deleteCourseFromCartAsync.rejected,
    //     (state, { payload }) => {
    //       // We show the error message
    //       // and change `status` back to `idle` again.
    //       if (payload) state.error = payload.message;
    //       state.status = "idle";
    //     }
    //   );
  },
});

//   export const { removeCourseFromCartAfterPurchase } = foodsSlice.actions;

export default foodsSlice.reducer;
