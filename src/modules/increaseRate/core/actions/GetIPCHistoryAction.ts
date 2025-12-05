import IIncreaseRate from "../entities/IIncreaseRate";
import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";
import { format, parse, eachMonthOfInterval } from "date-fns";

export interface IGetIPCHistoryAction {
  execute: (startPeriod: string, endPeriod: string) => Promise<IIncreaseRate[]>;
}

export const GetIPCHistoryAction = (
  increaseRateRepository: IIncreaseRateRepository
): IGetIPCHistoryAction => {
  return {
    execute: (startPeriod: string, endPeriod: string) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Validate period formats
          const periodRegex = /^\d{4}-\d{2}$/;
          if (!periodRegex.test(startPeriod) || !periodRegex.test(endPeriod)) {
            reject(new Error("Invalid period format. Expected YYYY-MM"));
            return;
          }

          // Generate all periods between start and end
          const startDate = parse(`${startPeriod}-01`, "yyyy-MM-dd", new Date());
          const endDate = parse(`${endPeriod}-01`, "yyyy-MM-dd", new Date());

          const months = eachMonthOfInterval({ start: startDate, end: endDate });
          const periods = months.map((date) => format(date, "yyyy-MM"));

          // Fetch IPC data for all periods
          const ipcData = await increaseRateRepository.findByPeriods(periods);

          resolve(ipcData);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
