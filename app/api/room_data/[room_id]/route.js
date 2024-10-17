import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request, { params }) {
  const room_id = params.room_id;
  const promisePool = mysqlPool.promise();
  const [rows, fields] = await promisePool.query(
    `SELECT * FROM room_data WHERE room_id = ?`,
    [room_id]
  );
  return NextResponse.json(rows);
}
