import dayjs from "dayjs";
import { convertBstToIsoDate } from "../../src/tools/utils";

test("convertBstToIsoDate", () => {
  const input = dayjs("2022-04-17T00:00:00Z");
  const expected = "2022-04-17";
  const result = convertBstToIsoDate(input);
  expect(result).toEqual(expected);
});
