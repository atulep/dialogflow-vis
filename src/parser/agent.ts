import fs = require('fs')
import path = require('path');

export class Agent {
  private _path: string
  private readonly INTENTS: string = 'intents';
  private _intents: Array<object>;

  /**
   * Getter intents
   * @return {Array<object>}
   */
	public get intents(): Array<object> {
    if (this._intents.length === 0) {
      this.intents = this.readAgent();
    }
		return this._intents;
	}

  /**
   * Setter intents
   * @param {Array<object>} value
   */
	public set intents(value: Array<object>) {
		this._intents = value;
	}
  
  constructor(path: string) {
    this._path = path;
    this._intents = [];
  }
  
  /**
   * Reads the intent JSON from the directory. Initializes userSays field to avoid undefined/nulls.
   * @param path_to_intents 
   * @param element 
   */
  private readIntent(path_to_intents: string, element: string): object {
    let initial: object = JSON.parse(fs.readFileSync(path.join(path_to_intents, element), 'utf-8'));
    (<any> initial).userSays = [];
    return initial;
  }

  /**
   * Reads the agent directed at path, and merges files that relate to the one intent.
   */
  private readAgent(): Array<object> {
    let intentsMap: Map<string, object> = new Map();
    const path_to_intents = path.join(this._path, this.INTENTS);
    const files: Array<string> = fs.readdirSync(path_to_intents);
    files.forEach(element => {
      const parsedFile: object = this.readIntent(path_to_intents, element);
      const fname: string = path.basename(element, '.json');
      let insert: boolean = true;
      for (let [key, val] of intentsMap) {
        // ONLY SUPPORTS ENGLISH SO FAR
        if (fname === key + '_usersays_en') {
          (<any> val).userSays = (<any> parsedFile).map((k: any) => k.data[0].text);
          insert = false;
          break;
        // TODO: (atulep) hacky way to check for non-english agents
        } else if (fname.includes('_usersays_') && !fname.includes('_usersays_en')) {
          const locale = fname.slice(fname.lastIndexOf('_usersays_') + '_usersays_'.length);
          throw new Error(`Currently, this software doesn't support ${locale} locale.`);
        }
      }
      if (insert) intentsMap.set(fname, parsedFile);
    });
    return Array.from(intentsMap.values());
  }
}
