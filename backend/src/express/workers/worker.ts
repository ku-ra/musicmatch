import { update } from "./spotifyData";
import * as cron from 'node-cron';

const setupWorker = () => {
    cron.schedule('0 0 * * *', () => {
        console.log("Executing Cron-Job");
        update();
    });
};

export default setupWorker;