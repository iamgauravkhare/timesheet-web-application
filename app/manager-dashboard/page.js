"use client";
import { useContext } from "react";
import { markRatingAPI } from "../apis";
import { centralData } from "../context";

const page = () => {
  const { loading, userData, token, setUserData, setManagersList } =
    useContext(centralData);

  const ratingData = ["1", "2", "3", "4", "5"];

  const markRating = (timesheetId, rating) => {
    const formdata = { timesheetId: timesheetId, rating: rating };
    markRatingAPI(token, formdata, setUserData, setManagersList);
  };

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
                <h1 className="text-3xl">Welcome, {userData.fullname}</h1>
                <h1 className="text-2xl">Manager Dashboard</h1>
                <h2 className="text-xl">
                  Timesheet Enteries Pending For Rating -{" "}
                </h2>
                <div className="w-full gap-10 columns-1 md:columns-2 lg:columns-3 italic">
                  {userData.timesheetPayload &&
                  userData.timesheetPayload.length > 0 ? (
                    userData.timesheetPayload.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-start gap-5 text-[16px] rounded-md shadow-xl border p-5 overflow-hidden mb-10"
                        >
                          <p>Employee - {e.employee.fullname}</p>
                          <p>Entry Date - {e.date}</p>
                          <p>Work Started At - {e.startTime}</p>
                          <p>Work Ended At - {e.endTime}</p>
                          <p>Total Hours Worked - {e.hoursWorked} Hr</p>
                          <p>
                            Current Rating -{" "}
                            {e.rating > 0 ? e.rating : "No Rating"}
                          </p>
                          <div className="flex flex-col gap-5">
                            <p className="text-red-500">Mark Rating - </p>
                            <div className="flex gap-5">
                              {ratingData.map((value, i) => {
                                return (
                                  <button
                                    onClick={() => markRating(e._id, value)}
                                    key={i}
                                    className="w-[25px] text-[12px] h-[25px] flex items-center justify-center rounded-full bg-gray-200"
                                  >
                                    {value}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
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
