"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import TemperatureChart from "@/components/TemperatureChart";
import HumidityChart from "@/components/HumidityChart";

interface Room {
  room_id: number;
  room_name: string;
  standard_temperature_min: number;
  standard_temperature_max: number;
  standard_humidity_min: number;
  standard_humidity_max: number;
  warning_temperature_min: number;
  warning_temperature_max: number;
  warning_humidity_min: number;
  warning_humidity_max: number;
}

interface RoomData {
  data_id: number;
  room_id: number;
  date_record: string;
  time_record: string;
  temperature: string;
  humidity: string;
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room_data, setRoom_data] = useState<RoomData[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number>(0);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/`);
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoomData = async (value: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/room_data/${value}`
      );
      const data = await res.json();
      console.log(data);
      setRoom_data(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSelectRoom = (value: string) => {
    const roomId = parseInt(value, 10);
    setSelectedRoom(roomId);
    fetchRoomData(roomId);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div>TEMPERATURE & HUMIDITY CHECK SHEET</div>

      <Table aria-label="Temperature and Humidity Records">
        <TableHeader>
          <TableColumn>Select</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>
            <div className="text-center">Standard Specification</div>
            <div className="grid grid-cols-2">
              <div className="text-center">Temperature (C°)</div>
              <div className="text-center">Humidity (%RH)</div>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="text-center">Warning Setting</div>
            <div className="grid grid-cols-2">
              <div className="text-center">Temperature (C°)</div>
              <div className="text-center">Humidity (%RH)</div>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {rooms.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <RadioGroup
                  value={selectedRoom.toString()}
                  onValueChange={handleSelectRoom}
                  aria-label="Select Room"
                >
                  <Radio value={item.room_id.toString()} />
                </RadioGroup>
              </TableCell>
              <TableCell>{item.room_name}</TableCell>
              <TableCell>
                <div className="grid grid-cols-2">
                  <div className="text-center">
                    {Number(item.standard_temperature_min)?.toFixed(0)} -
                    {Number(item.standard_temperature_max)?.toFixed(0)}
                  </div>
                  <div className="text-center">
                    {item.standard_humidity_min && Number(item.standard_humidity_min)?.toFixed(0)} {`≤`}{" "}
                    {Number(item.standard_humidity_max)?.toFixed(0)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="grid grid-cols-2">
                  <div className="text-center">
                    {item.warning_temperature_min && Number(item.warning_temperature_min)?.toFixed(0)} {`>`}{" "}
                    {Number(item.warning_temperature_max)?.toFixed(0)}
                  </div>
                  <div className="text-center">
                    {item.warning_humidity_min && Number(item.warning_humidity_min)?.toFixed(0)} {`>`}{" "}
                    {Number(item.warning_humidity_max)?.toFixed(0)}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div>
        <pre>{JSON.stringify(room_data, null, 2)}</pre>
      </div> */}
      {/* Temperature Chart */}
      {room_data.length > 0 && (
        <TemperatureChart
          roomData={room_data}
          tempMax={
            rooms.find((max) => max.room_id === selectedRoom)
              ?.standard_temperature_max || 0
          }
          tempMin={
            rooms.find((min) => min.room_id === selectedRoom)
              ?.standard_temperature_min || 0
          }
        />
      )}

      {/* Humidity Chart */}
      {room_data.length > 0 && (
        <HumidityChart
          roomData={room_data}
          humMax={
            rooms.find((max) => max.room_id === selectedRoom)
              ?.standard_humidity_max || null
          }
          humMin={
            rooms.find((min) => min.room_id === selectedRoom)
              ?.standard_humidity_min || null
          }
        />
      )}
    </section>
  );
}
