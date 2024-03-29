/* eslint-disable @typescript-eslint/no-use-before-define */
import fs from 'fs';
import path from 'path';

const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x);

const flattenArray = (input: any[]) =>
  input.reduce(
    (acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])],
    [],
  );

const map = (fn: any) => (input: any[]) => input.map(fn);

const pathJoinPrefix = (prefix: string) => (extraPath: string) =>
  path.join(prefix, extraPath);

const walkDir = (fullPath: string) => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath);
};
const getAllFilesRecursively = (folder: string) =>
  pipe(
    fs.readdirSync,
    map(pipe(pathJoinPrefix(folder), walkDir)),
    flattenArray,
  )(folder);

export default getAllFilesRecursively;
