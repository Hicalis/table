import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import Worker from "./Worker/Worker";
import { addWorker, deleteWorker, editInfo } from "../Store/CompanySlice";
import "./Workers.css";

const Workers: FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isAddWorker, setIsAddWorker] = useState(false);
  const [formWorker, setFormWorker] = useState({
    secondName: "",
    firstName: "",
    position: "",
  });

  const companies = useAppSelector((state) => state.companies.Companies);

  const dispatch = useAppDispatch();

  const chooseCompanyInfo = [0, 0];

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    dispatch(editInfo(["allWorkersCheck", isChecked, chooseCompanyInfo[1]]));
  };

  const addWorkerStore = (formWorker: {
    secondName: string;
    firstName: string;
    position: string;
  }) => {
    dispatch(addWorker([chooseCompanyInfo[1], formWorker]));
    setIsAddWorker(!isAddWorker);
    setFormWorker({
      secondName: "",
      firstName: "",
      position: "",
    });
  };

  companies.forEach((el, index) => {
    if (el.isChecked) {
      chooseCompanyInfo[0]++;
      if (chooseCompanyInfo[1] === 0) {
        chooseCompanyInfo[1] = index;
      }
    }
  });

  return (
    <div className="Workers">
      {chooseCompanyInfo[0] === 1 ? (
        <>
          <div className="Workers-header">
            <h1>Сотрудники</h1>
            <div>
              <h2>Выделить всё</h2>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Чекбокс</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Должность</th>
              </tr>
            </thead>
            <tbody>
              {companies[chooseCompanyInfo[1]].workers.map((item) => (
                <Worker worker={item} isAllChecked={isChecked} key={item.id} />
              ))}
            </tbody>
          </table>
          {isAddWorker ? (
            <div className="Add-worker">
              <div>
                <h3>Фамилия</h3>
                <input
                  onChange={(event) => {
                    setFormWorker((prev) => ({
                      ...prev,
                      secondName: event.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <h3>Имя</h3>
                <input
                  onChange={(event) => {
                    setFormWorker((prev) => ({
                      ...prev,
                      firstName: event.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <h3>Должность</h3>
                <input
                  onChange={(event) => {
                    setFormWorker((prev) => ({
                      ...prev,
                      position: event.target.value,
                    }));
                  }}
                />
              </div>
              <button
                type="submit"
                onClick={() => {
                  addWorkerStore(formWorker);
                }}
              >
                Подтвердить
              </button>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setIsAddWorker(!isAddWorker);
            }}
          >
            {isAddWorker ? "Выйти" : "Добавить"}
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(deleteWorker(chooseCompanyInfo[1]));
            }}
          >
            Удалить
          </button>
        </>
      ) : null}
    </div>
  );
};
export default Workers;
