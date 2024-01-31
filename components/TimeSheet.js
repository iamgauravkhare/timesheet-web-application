"use client";
import { createTimesheetEntryAPI } from "@/app/apis";
import { centralData } from "@/app/context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const TimeSheet = () => {
  const router = useRouter();

  const [formdata, setFormdata] = useState({
    startTime: "",
    endTime: "",
    hoursWorked: "",
    manager: "",
    date: new Date(Date.now()).toDateString(),
  });

  const {
    loading,
    setLoading,
    token,
    setUserData,
    managersList,
    setManagersList,
  } = useContext(centralData);

  const onchangeHandler = (e) => {
    setFormdata((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    createTimesheetEntryAPI(
      setLoading,
      token,
      formdata,
      setUserData,
      setManagersList,
      router
    );
    setFormdata({
      startTime: "",
      endTime: "",
      hoursWorked: "",
      manager: "",
      date: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-10">
      {loading ? (
        <span className="loader mt-24"></span>
      ) : (
        <>
          <h1 className="text-3xl underline">Create Timesheet Entry</h1>
          <form
            className="flex flex-col w-full md:w-[40%] lg:w-[35%] gap-5 shadow-lg rounded-md p-3"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              className="w-full rounded-md p-3 border-2 outline-none"
              name="startTime"
              value={formdata.startTime}
              onChange={onchangeHandler}
              placeholder="Start Time (In Format - HH : MM AM/PM)"
            />
            <input
              type="text"
              className="w-full rounded-md p-3 border-2 outline-none"
              name="endTime"
              value={formdata.endTime}
              onChange={onchangeHandler}
              placeholder="End Time (In Format - HH : MM AM/PM)"
            />
            <input
              type="text"
              className="w-full rounded-md p-3 border-2 outline-none"
              placeholder="Total Worked Hours (In Format - 0 - 24)"
              name="hoursWorked"
              value={formdata.hoursWorked}
              onChange={onchangeHandler}
            />
            <select
              name="manager"
              id=""
              className="w-full rounded-md p-3 border-2 outline-none"
              value={formdata.manager}
              onChange={onchangeHandler}
            >
              <option>Select Your Manager</option>
              {managersList &&
                managersList.length > 0 &&
                managersList.map((e, i) => {
                  return (
                    <option value={e._id} key={i}>
                      {e.fullname}
                    </option>
                  );
                })}
            </select>

            <input
              type="submit"
              value="Submit Entry"
              className="w-full rounded-md p-3 border-2 outline-none hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            />
          </form>
        </>
      )}
    </div>
  );
};

export default TimeSheet;
