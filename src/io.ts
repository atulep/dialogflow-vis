import fs = require('fs');

export class IO {
  private _in: string;
  private _out: string;

  /**
   * Getter in
   * @return {string}
   */
	public get in(): string {
		return this._in;
	}

  /**
   * Getter out
   * @return {string}
   */
	public get out(): string {
		return this._out;
	}

  /**
   * Setter in
   * @param {string} value
   */
	public set in(value: string) {
		this._in = value;
	}

  /**
   * Setter out
   * @param {string} value
   */
	public set out(value: string) {
		this._out = value;
	}
  
  constructor(path_in: string, path_out: string) {
    this._in = path_in;
    this._out = path_out;
  }

  write(code: string): void {
    if (this._out) {
      if (fs.existsSync(this._out + '.html')) {
        console.log(`File ${this._out} already exists`);
        console.log('No action was performed.');
      } else { 
        fs.writeFileSync(this._out + '.html', code, 'utf-8');
        console.log(`${this._out}.html was created`);
      }
    } else {
      console.log(code);
    }
  }
}