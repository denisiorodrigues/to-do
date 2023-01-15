import {v4 as uuidV4} from "uuid";

class Task {
    id: string;
    title: string;
    isComplete: boolean;

    constructor(title) { 
        if(!this.id){
            this.id = uuidV4();
            this.isComplete = false;
        }

        this.title = title;
    }
}

export { Task }