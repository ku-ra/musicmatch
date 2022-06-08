import { update } from "./spotifyData";
import * as cron from 'node-cron';

const setupWorker = () => {
    cron.schedule('* * * * *', () => {
        console.log("Executing Cron-Job");
        update();
    });
};

export default setupWorker;