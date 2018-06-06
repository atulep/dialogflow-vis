const { ArgumentParser } = require('argparse');
export const initArgumentParser = () => {
  let argParser = new ArgumentParser({
    description: 'DialogFlow visualizing software',
    version: '0.0.1'
  });
  argParser.addArgument(
    [ 'file'],
    {
      help: 'Path to a folder with DialogFlow agent.' 
    }
  );
  
  argParser.addArgument(
    ['-o', '--out'],
    {
      help: 'Name of the file where to redirect the output.'
    }
  );
  return argParser;
};