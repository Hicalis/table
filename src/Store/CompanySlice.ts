import { createSlice } from "@reduxjs/toolkit";

export type Workers = {
  id: number;
  isChecked: boolean;
  secondName: string;
  firstName: string;
  position: string;
};

export type CompanyState = {
  id: number;
  name: string;
  workers: Workers[];
  workerCount: number;
  address: string;
};

const initialState = {
  Companies: [
    {
      id: Math.random(),
      isChecked: false,
      name: "Apple",
      workers: [
        {
          id: Math.random(),
          isChecked: false,
          secondName: "Pavlov",
          firstName: "Alex",
          position: "boss",
        },
        {
          id: Math.random(),
          isChecked: false,
          secondName: "Ivanov",
          firstName: "Oleg",
          position: "employer",
        },
      ],
      workerCount: 2,
      address: "New-York",
    },
    {
      id: Math.random(),
      isChecked: false,
      name: "Microsoft",
      workers: [
        {
          id: Math.random(),
          isChecked: false,
          secondName: "Pavlov",
          firstName: "Alex",
          position: "boss",
        },
        {
          id: Math.random(),
          isChecked: false,
          secondName: "Ivanov",
          firstName: "Oleg",
          position: "employer",
        },
        {
          id: Math.random(),
          isChecked: false,
          secondName: "Hiroki",
          firstName: "Andrew",
          position: "secretary",
        },
      ],
      workerCount: 3,
      address: "Moscow",
    },
  ],
};

export const CompanySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompany(state, action) {
      state.Companies.push({
        id: Math.random(),
        isChecked: false,
        name: action.payload[0],
        workers: [],
        workerCount: 0,
        address: action.payload[1],
      });
    },
    addWorker(state, action) {
      state.Companies[action.payload[0]].workers.push({
        id: Math.random(),
        isChecked: false,
        secondName: action.payload[1].secondName,
        firstName: action.payload[1].firstName,
        position: action.payload[1].position,
      });
      state.Companies[action.payload[0]].workerCount += 1;
    },
    deleteCompany(state) {
      state.Companies = state.Companies.filter((el) => !el.isChecked);
    },
    deleteWorker(state, action) {
      let count = 0;
      state.Companies[action.payload].workers = state.Companies[
        action.payload
      ].workers.filter((el) => {
        if (!el.isChecked === false) {
          count++;
        }
        return !el.isChecked;
      });
      state.Companies[action.payload].workerCount -= count;
    },
    editInfo(state, action) {
      if (action.payload[0] === "companyName") {
        const index = state.Companies.findIndex(
          (company) => company.id === action.payload[2]
        );
        if (index !== -1) {
          state.Companies[index].name = action.payload[1];
        }
      } else if (action.payload[0] === "companyAddress") {
        const index = state.Companies.findIndex(
          (company) => company.id === action.payload[2]
        );
        if (index !== -1) {
          state.Companies[index].address = action.payload[1];
        }
      } else if (action.payload[0] === "companyCheck") {
        const index = state.Companies.findIndex(
          (company) => company.id === action.payload[2]
        );
        if (index !== -1) {
          state.Companies[index].isChecked = !action.payload[1];
        }
      } else if (action.payload[0] === "workerCheck") {
        state.Companies.forEach((el) => {
          if (el.isChecked) {
            el.workers.forEach((worker) => {
              if (worker.id === action.payload[2]) {
                worker.isChecked = !action.payload[1];
              }
            });
          }
        });
      } else if (action.payload[0] === "allCompanyCheck") {
        state.Companies.forEach((el) => {
          el.isChecked = !action.payload[1];
        });
      } else if (action.payload[0] === "allWorkersCheck") {
        state.Companies[action.payload[2]].workers.forEach((el) => {
          el.isChecked = !action.payload[1];
        });
      } else if (action.payload[0] === "workerSecondName") {
        state.Companies.forEach((el) => {
          if (el.isChecked) {
            el.workers.forEach((worker) => {
              if (worker.id === action.payload[2]) {
                worker.secondName = action.payload[1];
              }
            });
          }
        });
      } else if (action.payload[0] === "workerFirstName") {
        state.Companies.forEach((el) => {
          if (el.isChecked) {
            el.workers.forEach((worker) => {
              if (worker.id === action.payload[2]) {
                worker.firstName = action.payload[1];
              }
            });
          }
        });
      } else if (action.payload[0] === "workerPosition") {
        state.Companies.forEach((el) => {
          if (el.isChecked) {
            el.workers.forEach((worker) => {
              if (worker.id === action.payload[2]) {
                worker.position = action.payload[1];
              }
            });
          }
        });
      }
    },
  },
});

export const { deleteCompany, editInfo, addCompany, deleteWorker, addWorker } =
  CompanySlice.actions;
export default CompanySlice.reducer;
