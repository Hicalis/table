import React, { FC, useEffect, useState } from "react";
import { CompanyState, editInfo } from "../../Store/CompanySlice";
import { useAppDispatch } from "../../hook";

interface IProps {
  company: CompanyState;
  isAllChecked: boolean;
}

const Company: FC<IProps> = ({ company, isAllChecked }) => {
  const [isChecked, setIsChecked] = useState(isAllChecked);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [name, setName] = useState(company.name);
  const [address, setAddress] = useState(company.address);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsChecked(isAllChecked);
  }, [isAllChecked]);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    dispatch(editInfo(["companyCheck", isChecked, company.id]));
  };

  const editName = (newName: string) => {
    dispatch(editInfo(["companyName", newName, company.id]));
  };

  const editAddress = (newAddress: string) => {
    dispatch(editInfo(["companyAddress", newAddress, company.id]));
  };

  return (
    <tr
      key={company.id}
      style={
        isChecked ? { backgroundColor: "blue" } : { backgroundColor: "white" }
      }
    >
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        {isEditName ? (
          <>
            <input
              defaultValue={company.name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => {
                editName(name);
                setIsEditName((prev) => !prev);
              }}
            >
              Подтвердить
            </button>
          </>
        ) : (
          <>
            {company.name}
            <button
              type="button"
              onClick={() => {
                setIsEditName((prev) => !prev);
              }}
            >
              Edit
            </button>
          </>
        )}
      </td>
      <td>{company.workerCount}</td>
      <td>
        {isEditAddress ? (
          <>
            <input
              defaultValue={company.address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => {
                editAddress(address);
                setIsEditAddress((prev) => !prev);
              }}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            {company.address}
            <button
              type="button"
              onClick={() => {
                setIsEditAddress((prev) => !prev);
              }}
            >
              Edit
            </button>
          </>
        )}
      </td>
    </tr>
  );
};
export default Company;
