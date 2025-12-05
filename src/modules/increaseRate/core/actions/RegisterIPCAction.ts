import IIncreaseRate from "../entities/IIncreaseRate";
import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";
import { format, parse } from "date-fns";

export interface IRegisterIPCAction {
  execute: (period: string, rate: number) => Promise<IIncreaseRate>;
}

export const RegisterIPCAction = (
  increaseRateRepository: IIncreaseRateRepository
): IRegisterIPCAction => {
  return {
    execute: (period: string, rate: number) => {
      return new Promise(async (resolve, reject) => {
        try {
          const periodRegex = /^\d{4}-\d{2}$/;
          if (!periodRegex.test(period)) {
            reject(new Error("Invalid period format. Expected YYYY-MM"));
            return;
          }

          // Check if IPC already exists for this period
          const existing = await increaseRateRepository.findByPeriod(period);

          if (existing) {
            // Update existing IPC
            const updated = await increaseRateRepository.edit(
              { ...existing, rate },
              existing.id
            );
            resolve(updated as IIncreaseRate);
          } else {
            // Create new IPC
            const [year, month] = period.split("-");
            const monthNames = [
              "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            const monthName = monthNames[parseInt(month) - 1];

            const ipcData: Partial<IIncreaseRate> = {
              name: `IPC ${monthName} ${year}`,
              rate,
              date: parse(`${period}-01`, "yyyy-MM-dd", new Date()),
              frequency: period, // Store period in frequency field
            };

            const created = await increaseRateRepository.save(ipcData as IIncreaseRate);
            resolve(created as IIncreaseRate);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
