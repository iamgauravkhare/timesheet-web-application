"use client";
import React, { useContext } from "react";
import { centralData } from "../context";

const page = () => {
  const { loading, userData } = useContext(centralData);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1260px] flex flex-col items-start gap-10 p-5 min-h-screen">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <span className="loader mt-24"></span>
          </div>
        ) : (
          <>
            {userData && (
              <>
                <h1 className="text-2xl">Employee Dashboard</h1>
                <h1 className="text-3xl">Welcome, {userData.fullname}</h1>
                <h2 className="text-xl">Your Timesheet Enteries - </h2>
                <div className="w-full gap-10 columns-1 md:columns-2 lg:columns-3 italic">
                  {userData.timesheets && userData.timesheets.length > 0 ? (
                    userData.timesheets.reverse().map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-start gap-5 text-[16px] rounded-md shadow-xl border p-5 overflow-hidden mb-10"
                        >
                          <p>Entry Date - {e.date}</p>
                          <p>Work Started At - {e.startTime}</p>
                          <p>Work Ended At - {e.endTime}</p>
                          <p>Total Hours Worked - {e.hoursWorked} Hr</p>
                          <p>Manager - {e?.manager?.fullname}</p>
                          <p>Rating - {e?.rating}</p>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
