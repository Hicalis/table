import React, { FC, useEffect, useState } from "react";
import { Workers, editInfo } from "../../Store/CompanySlice";
import { useAppDispatch } from "../../hook";

interface IProps {
  worker: Workers;
  isAllChecked: boolean;
}

const Worker: FC<IProps> = ({ worker, isAllChecked }) => {
  const [formData, setFormData] = useState({
    isChecked: worker.isChecked,
    isEditName: false,
    isEditSecondName: false,
    isEditPosition: false,
    name: worker.firstName,
    secondName: worker.secondName,
    position: worker.position,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      isChecked: worker.isChecked,
    }));
  }, [worker.isChecked]);

  const dispatch = useAppDispatch();

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      isChecked: !prevData.isChecked,
    }));
    dispatch(editInfo(["workerCheck", formData.isChecked, worker.id]));
  };

  const handleEditSecondName = (secondName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      isEditSecondName: false,
    }));
    dispatch(editInfo(["workerSecondName", secondName, worker.id]));
  };

  const handleEditFirstName = (firstName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      isEditName: false,
    }));
    dispatch(editInfo(["workerFirstName", firstName, worker.id]));
  };

  const handleEditPosition = (position: string) => {
    setFormData((prevData) => ({
      ...prevData,
      isEditPosition: false,
    }));
    dispatch(editInfo(["workerPosition", position, worker.id]));
  };
  return (
    <tr
      key={worker.id}
      style={
        formData.isChecked
          ? { backgroundColor: "blue" }
          : { backgroundColor: "white" }
      }
    >
      <td>
        <input
          type="checkbox"
          checked={formData.isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        {formData.isEditSecondName ? (
          <>
            <input
              defaultValue={worker.secondName}
              onChange={(event) => {
                setFormData((prevData) => ({
                  ...prevData,
                  secondName: event.target.value,
                }));
              }}
            />
            <button
              type="button"
              onClick={() => {
                handleEditSecondName(formData.secondName);
              }}
            >
              Подтвердить
            </button>
          </>
        ) : (
          <>
            {worker.secondName}
            <button
              type="button"
              onClick={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  isEditSecondName: true,
                }));
              }}
            >
              Изменить
            </button>
          </>
        )}
      </td>
      <td>
        {formData.isEditName ? (
          <>
            <input
              defaultValue={worker.firstName}
              onChange={(event) => {
                setFormData((prevData) => ({
                  ...prevData,
                  name: event.target.value,
                }));
              }}
            />
            <button
              type="button"
              onClick={() => {
                handleEditFirstName(formData.name);
              }}
            >
              Подтвердить
            </button>
          </>
        ) : (
          <>
            {worker.firstName}
            <button
              type="button"
              onClick={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  isEditName: true,
                }));
              }}
            >
              Изменить
            </button>
          </>
        )}
      </td>
      <td>
        {formData.isEditPosition ? (
          <>
            <input
              defaultValue={worker.position}
              onChange={(event) => {
                setFormData((prevData) => ({
                  ...prevData,
                  position: event.target.value,
                }));
              }}
            />
            <button
              type="button"
              onClick={() => {
                handleEditPosition(formData.position);
              }}
            >
              Подтвердить
            </button>
          </>
        ) : (
          <>
            {worker.position}
            <button
              type="button"
              onClick={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  isEditPosition: true,
                }));
              }}
            >
              Изменить
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Worker;
