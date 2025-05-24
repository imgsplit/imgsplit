import {mkdirSync, writeFileSync} from "fs";
import {test} from "vitest";
import {OuputDataType} from "../src";

const inputDir = 'test/assets/';
const outputDir = 'test/.out/';

export function createTest(testName: string, fn: (inputDir: string, outputDir: string) => Promise<OuputDataType[]>) {
    testName = testName.replace(/\s/ig, '-')
    test(testName, async () => {
        const arr = await fn(inputDir, outputDir);

        if (!arr || arr.length == 0) return;

        mkdirSync(`${outputDir}/${testName}/`, {
            recursive: true
        });

        for (let i = 0; i < arr.length; i++) {
            writeFileSync(`${outputDir}/${testName}/${i}.jpg`, arr[i].buffer)
        }
    })
}