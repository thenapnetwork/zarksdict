import Dexie from "dexie";

export const Database = new Dexie("database");
Database.version(1).stores({
    words: "++id, english, chinese, type, year, month, day",
    setting: "&setting, value",
});