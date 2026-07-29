import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-slate-500 mt-8 mb-4">All Rooms</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] bg-white rounded-[28px] shadow-sm overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="py-4 px-5 text-slate-700 font-medium text-left">
                Name
              </th>
              <th className="py-4 px-5 text-slate-700 font-medium text-left hidden sm:table-cell">
                Facility
              </th>
              <th className="py-4 px-5 text-slate-700 font-medium text-left">
                Price / night
              </th>
              <th className="py-4 px-5 text-slate-700 font-medium text-center">
                Available
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {rooms.map((item, index) => (
              <tr
                key={index}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="py-4 px-5">{item.roomType}</td>
                <td className="py-4 px-5 hidden sm:table-cell">
                  {item.amenities.join(", ")}
                </td>
                <td className="py-4 px-5">${item.pricePerNight}</td>
                <td className="py-4 px-5 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      readOnly
                    />
                    <div className="w-12 h-7 rounded-full bg-slate-300 peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
