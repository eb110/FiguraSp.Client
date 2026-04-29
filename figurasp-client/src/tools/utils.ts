import type dayjs from "dayjs"

export const convertBstToIsoDate = (date: dayjs.Dayjs): string => {
    return date.add(1, "hour").toISOString().substring(0, 10);
}