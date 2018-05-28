import fs = require('fs')
import path = require('path');

export class Agent {
  private path: string
  private readonly INTENTS: string = 'intents';
  public intents: Array<object>;

  constructor(path: string) {
    this.path = path;
    this.intents = this.read();
  }
  
  /**
   * Reads the agent directed at path, and merges files that relate to the one intent.
   */
  private read(): Array<object> {
    let intentsMap = {
      [Symbol.iterator]: function* () {
        let properties = Object.keys(this);
        for (let i of properties) {
            yield [i, this[i]];
        }
      }  
    };
    
    const path_to_intents = this.path + '/' + this.INTENTS;
    const files: Array<string> = fs.readdirSync(path_to_intents);
    
    files.forEach(element => {
      const parsedFile: object =  JSON.parse(fs.readFileSync(path_to_intents + '/' + element, 'utf-8'));
      const fname: string = path.basename(element, '.json');
      let insert: boolean = true;
      for (let [key, val] of intentsMap) {
        // ONLY SUPPORTS ENGLISH SO FAR
        if (fname === key + '_usersays_en') {
          console.log('found fname' + fname);
          (<any> intentsMap)[key].userSays = (<any> parsedFile).map((k: any) => k.data[0].text);
          insert = false;
          break;
        }
      }
      if (insert) (<any> intentsMap)[fname] = parsedFile;
    });
    return Object.keys(intentsMap).map(key => (<any>intentsMap)[key])
  }
}
