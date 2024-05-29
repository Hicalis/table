import React, { FC, useState } from "react";
import "./Companies.css";
import Company from "./Company/Company";
import { useAppDispatch, useAppSelector } from "../hook";
import { addCompany, deleteCompany, editInfo } from "../Store/CompanySlice";

const Companies: FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isAddCompany, setIsAddCompany] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const companies = useAppSelector((state) => state.companies.Companies);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    dispatch(editInfo(["allCompanyCheck", isChecked]));
  };

  const addCompanyStore = (name: string, address: string) => {
    dispatch(addCompany([name, address]));
  };

  return (
    <div className="Companies">
      <div className="Companies-header">
        <h1>Компании</h1>
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
            <th>Название компании</th>
            <th>Кол-во сотрудников</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((item) => (
            <Company company={item} isAllChecked={isChecked} key={item.id} />
          ))}
        </tbody>
      </table>
      {isAddCompany ? (
        <div className="Add-company">
          <div>
            <h3>Название компании</h3>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Адрес</h3>
            <input
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              addCompanyStore(name, address);
              setIsAddCompany(!isAddCompany);
            }}
          >
            Подтвердить
          </button>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => {
          setIsAddCompany(!isAddCompany);
        }}
      >
        {isAddCompany ? "Выйти" : "Добавить"}
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(deleteCompany());
        }}
      >
        Удалить
      </button>
    </div>
  );
};
export default Companies;
